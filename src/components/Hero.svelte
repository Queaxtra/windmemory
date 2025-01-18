<script lang="ts">
    import { onMount } from 'svelte';
    import { getPrompts } from '$lib/prompts';
    
    interface Prompt {
        title: string;
        date: string;
        author: string;
        description: string;
        content: string;
        tags: string[];
    }
    let prompts: Prompt[] = [];
    let searchQuery = "";
    let selectedTags: string[] = [];
    let allTags: string[] = [];
    let filteredPrompts: Prompt[] = [];
    let tagCounts: { [key: string]: number } = {};
    let loading = true;

    onMount(async () => {
        try {
            const data = await getPrompts();
            if (!Array.isArray(data)) {
                console.error('Beklenen prompt dizisi alınamadı:', data);
                return;
            }
            prompts = data;
            
            prompts.forEach(prompt => {
                prompt.tags.forEach(tag => {
                    tagCounts[tag] = (tagCounts[tag] || 0) + 1;
                });
            });
            
            allTags = [...new Set(prompts.flatMap(prompt => prompt.tags))];
            filteredPrompts = prompts;
        } catch (error) {
            console.error('Promptlar yüklenirken hata oluştu:', error);
        } finally {
            loading = false;
        }
    });

    function filterPrompts() {
        filteredPrompts = prompts.filter(prompt => {
            const matchesSearch = searchQuery.toLowerCase() === "" || 
                prompt.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
                prompt.description.toLowerCase().includes(searchQuery.toLowerCase()) ||
                prompt.content.toLowerCase().includes(searchQuery.toLowerCase()) ||
                prompt.tags.some(tag => tag.toLowerCase().includes(searchQuery.toLowerCase()));

            const matchesTags = selectedTags.length === 0 || 
                selectedTags.every(tag => prompt.tags.includes(tag));

            return matchesSearch && matchesTags;
        });
    }

    function toggleTag(tag: string) {
        const index = selectedTags.indexOf(tag);
        if (index === -1) {
            selectedTags = [...selectedTags, tag];
        } else {
            selectedTags = selectedTags.filter(t => t !== tag);
        }
        filterPrompts();
    }

    $: {
        searchQuery;
        filterPrompts();
    }

    function copyPrompt(prompt: Prompt, index: number) {
        navigator.clipboard.writeText(prompt.content).then(() => {
            const button = document.getElementById(`copy-button-${index}`);
            if (button) {
                const originalContent = button.innerHTML;
                button.innerHTML = '<svg xmlns="http://www.w3.org/2000/svg" width="15" height="15" viewBox="0 0 36 36" class="mr-2"><path fill="currentColor" d="M13.72 27.69L3.29 17.27a1 1 0 0 1 1.41-1.41l9 9L31.29 7.29A1 1 0 0 1 32.7 8.7Z" class="clr-i-outline clr-i-outline-path-1"/><path fill="none" d="M0 0h36v36H0z"/></svg> Copied!';
                setTimeout(() => {
                    button.innerHTML = originalContent;
                }, 2000);
            }
        }).catch(err => {
            console.error("Copying failed: ", err);
        });
    }
</script>

<div class="min-h-screen pt-28">
    <div class="container mx-auto px-4">
        {#if loading}
        <div class="text-center min-h-screen flex items-center justify-center text-white/30 font-light">
            <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" class="mr-2"><g fill="none" stroke="currentColor" stroke-linecap="round" stroke-linejoin="round" stroke-width="2"><path stroke-dasharray="16" stroke-dashoffset="16" d="M12 3c4.97 0 9 4.03 9 9"><animate fill="freeze" attributeName="stroke-dashoffset" dur="0.3s" values="16;0"/><animateTransform attributeName="transform" dur="1.5s" repeatCount="indefinite" type="rotate" values="0 12 12;360 12 12"/></path><path stroke-dasharray="64" stroke-dashoffset="64" stroke-opacity=".3" d="M12 3c4.97 0 9 4.03 9 9c0 4.97 -4.03 9 -9 9c-4.97 0 -9 -4.03 -9 -9c0 -4.97 4.03 -9 9 -9Z"><animate fill="freeze" attributeName="stroke-dashoffset" dur="1.2s" values="64;0"/></path></g></svg>
            <p>Loading prompts...</p>
        </div>
        {:else}
        <h1 class="text-4xl font-bold mb-2 text-white text-left">{filteredPrompts.length} prompts were shared.</h1>
        <a href="/prompts/usage" class="text-white/30 underline decoration-dotted block">Where do I put these prompts?</a>
        <div class="my-6 space-y-4">
            <input type="text" bind:value={searchQuery} placeholder="Search prompts..." class="w-full px-4 py-2 rounded-lg bg-black/5 text-white border border-white/10 focus:outline-none focus:border-white/30 placeholder:text-white/30" />
            <div class="flex flex-wrap gap-2">
                {#each allTags as tag}
                <button class="px-3 py-1 rounded-md text-sm font-light border border-white/10 transition-all duration-300 {selectedTags.includes(tag) ? 'bg-white/20 border-white/30' : 'bg-white/5 border-white/10 hover:bg-white/10'}" on:click={() => toggleTag(tag)}>
                    #{tag} ({tagCounts[tag]})
                </button>
                {/each}
            </div>
        </div>

        <div class="grid grid-cols-1 sm:grid-cols-2 gap-6 py-5">
            {#if filteredPrompts.length === 0}
            <div class="col-span-2 text-center py-8 text-white/30">
                <p class="text-xl">Sorry, no prompts matched your search.</p>
                <p class="text-sm mt-2 font-light">You can try different keywords or clear the filters.</p>
                <p class="text-sm mt-2 font-light">Or, you can try searching for a different keyword.</p>
            </div>
            {:else}
            {#each filteredPrompts as prompt, index}
            <div class="p-6 rounded-lg bg-black/5 text-white border border-white/10 hover:bg-black/10 transition-all duration-300 text-left">
                <h2 class="text-2xl font-semibold mb-2 flex justify-between items-center">
                    <span>{prompt.title}</span>
                    <span class="text-sm font-light opacity-30 flex items-center">
                        <svg xmlns="http://www.w3.org/2000/svg" width="15" height="15" viewBox="0 0 24 24" class="inline-block mr-1"><path fill="currentColor" d="M5 22q-.825 0-1.412-.587T3 20V6q0-.825.588-1.412T5 4h1V2h2v2h8V2h2v2h1q.825 0 1.413.588T21 6v14q0 .825-.587 1.412T19 22zm0-2h14V10H5z"/></svg>
                        {new Date(prompt.created).toLocaleDateString()}
                        <svg xmlns="http://www.w3.org/2000/svg" width="15" height="15" viewBox="0 0 24 24" class="inline-block mr-1 ml-2"><path fill="currentColor" d="M12 12q-1.65 0-2.825-1.175T8 8t1.175-2.825T12 4t2.825 1.175T16 8t-1.175 2.825T12 12m-8 8v-2.8q0-.85.438-1.562T5.6 14.55q1.55-.775 3.15-1.162T12 13t3.25.388t3.15 1.162q.725.375 1.163 1.088T20 17.2V20z"/></svg>
                        {prompt.author}
                    </span>
                </h2>
                <p class="text-sm mb-4 font-light opacity-70">{prompt.description}</p>
                <hr class="border-white/10 mb-4">
                {#if prompt.prompts}
                <div class="bg-white/5 px-4 py-2 text-white/70 border border-white/10 font-mono text-sm rounded-lg max-h-48 overflow-y-auto">
                    {@html prompt.prompts}
                </div>
                <hr class="border-white/10 mt-5">
                <div class="flex flex-col justify-between items-start mt-4 text-white/50 gap-4">
                    <button class="w-full flex items-center justify-center bg-white/5 hover:bg-white/10 transition duration-300 px-4 py-2 rounded-lg font-light border border-white/10" id="copy-button-{index}" on:click={() => copyPrompt(prompt, index)}>
                        <svg id="copy-icon-{index}" xmlns="http://www.w3.org/2000/svg" width="15" height="15" viewBox="0 0 256 256" class="mr-2">
                            <g fill="currentColor">
                                <path d="M216 40v128h-48V88H88V40Z" opacity=".2"/>
                                <path d="M216 32H88a8 8 0 0 0-8 8v40H40a8 8 0 0 0-8 8v128a8 8 0 0 0 8 8h128a8 8 0 0 0 8-8v-40h40a8 8 0 0 0 8-8V40a8 8 0 0 0-8-8m-56 176H48V96h112Zm48-48h-32V88a8 8 0 0 0-8-8H96V48h112Z"/>
                            </g>
                        </svg>
                        Copy Prompt
                    </button>
                    <div class="flex flex-wrap items-center w-full justify-start gap-2 mt-2">
                        {#each prompt.tags as tag}
                        <span class="text-sm font-light opacity-90 bg-white/5 hover:bg-white/10 transition duration-300 px-3 py-1 rounded-md border border-white/10">#{tag}</span>
                        {/each}
                    </div>
                </div>
                {:else}
                <p class="text-red-500">Content is not available.</p>
                {/if}
            </div>
            {/each}
            {/if}
        </div>
        {/if}
    </div>
</div>
