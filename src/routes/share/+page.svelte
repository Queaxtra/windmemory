<script lang="ts">
    import Navbar from "../../components/Navbar.svelte";
    import Footer from "../../components/Footer.svelte";
</script>

<Navbar />

<div class="min-h-screen pt-28">
    <div class="container mx-auto px-4 md:px-6 lg:px-8 xl:px-10">
        <h1 class="text-4xl font-bold mb-4 text-white text-left">How to Contribute a Prompt?</h1>
        <div class="p-6 rounded-lg bg-black/5 text-white border border-white/10 hover:bg-black/10 transition-all duration-300 text-left">
            <p class="text-white mb-2 lg:text-lg">
                This website is an open source project, <a href="https://github.com/queaxtra/windmemory" class="text-white/70 underline">queaxtra/windmemory</a>. Anyone can contribute.
            </p>
            <p class="text-white mb-2 lg:text-lg">
                If you want to add a prompt, just open a new page on Github under “Issues” and write the prompt you want to add. I will try to add all prompts to the system as much as I can.
            </p>
            <p class="text-white lg:text-lg">
                If you have a problem, please contact <a href="mailto:fatih@etik.com" class="text-white/70 underline">fatih@etik.com</a>.
            </p>
        </div>
    </div>
</div>

<Footer />