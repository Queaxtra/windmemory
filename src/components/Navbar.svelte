<script>
    import { slide } from 'svelte/transition';
    import { quintOut } from 'svelte/easing';
    import { onMount } from 'svelte';

    let isOpen = false;
    const toggleMenu = () => isOpen = !isOpen;

    const navLinks = [
        { href: '/', text: 'Home' },
        { href: '/share', text: 'Share' },
        { href: 'https://github.com/queaxtra/windmemory', text: 'Github' },
        { href: 'https://x.com/queaxtra', text: 'X (Twitter)' },
    ];

    onMount(() => {
        const clickOutside = (event) => {
            const target = event.target;
            const menu = document.getElementById('mobile-menu');
            const button = document.getElementById('menu-button');
            if (menu && !menu.contains(target) && !button.contains(target)) {
                isOpen = false;
            }
        };

        document.addEventListener('click', clickOutside);

        return () => {
            document.removeEventListener('click', clickOutside);
        };
    });
</script>

<nav class="fixed top-0 left-0 w-full backdrop-blur-md z-50">
    <div class="container mx-auto px-4">
        <div class="flex justify-between items-center h-16">
            <div class="flex-shrink-0 flex items-center">
                <a href="/" class="font-bold text-xl">WindMemory</a>
            </div>

            <div class="hidden md:flex items-center space-x-8">
                {#each navLinks as link}
                <a href={link.href} class="text-white/70 hover:text-white transition-colors duration-200 font-light">
                    {link.text}
                </a>
                {/each}
            </div>

            <div class="md:hidden">
                <button id="menu-button" on:click={toggleMenu} class="text-opacity-80 p-2 rounded-md transition-colors duration-200" aria-label="Toggle main menu">
                    <svg class="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                        {#if !isOpen}
                        <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M4 6h16M4 12h16M4 18h16" />
                        {:else}
                        <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M6 18L18 6M6 6l12 12" />
                        {/if}
                    </svg>
                </button>
            </div>
        </div>
    </div>

    {#if isOpen}
    <div id="mobile-menu" class="md:hidden" transition:slide={{ duration: 200, easing: quintOut }}>
        <div class="px-2 pt-2 pb-3 space-y-1 backdrop-blur-md">
            {#each navLinks as link}
            <a href={link.href} class="block px-3 py-2 text-white/70 hover:text-white rounded-md transition-colors duration-200">
                {link.text}
            </a>
            {/each}
        </div>
    </div>
    {/if}
</nav>
