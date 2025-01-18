<script lang="ts">
    import Navbar from "../../../components/Navbar.svelte";
    import Footer from "../../../components/Footer.svelte";

    const prompts = [
        { 
            description: "At first click on the 3 dots (...) marked in red.", 
            img: "https://www.upload.ee/image/17643561/SCR-20250118-rrvy.png" },
        { 
            description: "Press the 3 dots and click on “Manage Memories”.", 
            img: "https://www.upload.ee/image/17643571/SCR-20250118-rtdo.png"
        },
        {
            description: "Click on “Edit global rules” in the drop-down menu. This section is the rules for Windsurf, the one below it is the specific rules only for the project you are actively doing.",
            img: "https://www.upload.ee/image/17643575/SCR-20250118-rtqh.png"
        },
        {
            description: "The last part is to enter the desired or copied rules in the drop-down menu.",
            img: "https://www.upload.ee/image/17643594/SCR-20250118-rwgq.png"
        }
    ];
</script>

<Navbar />

<div class="min-h-screen pt-28">
    <div class="container mx-auto px-4">
        <h1 class="text-4xl font-bold mb-4 text-white text-left">Usage of Prompts</h1>
        <div class="grid grid-cols-1 sm:grid-cols-2 gap-6 py-5">
            {#each prompts as prompt}
            <div class="p-6 rounded-lg bg-black/5 text-white border border-white/10 hover:bg-black/10 transition-all duration-300 text-left">
                <p class="mb-4 font-light opacity-80">{prompt.description}</p>
                <hr class="border-white/10 mb-4">
                <img src={prompt.img} class="mb-4 rounded-lg" />
            </div>
            {/each}
        </div>
    </div>
</div>

<Footer />