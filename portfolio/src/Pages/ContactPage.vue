<script>
import LangDiv from '@/components/LangDiv.vue';
import TopNav from '@/components/TopNav.vue';
import LangSelector from '@/components/LangSelector.vue';
export default {
    components: { LangSelector, LangDiv, TopNav }
}
</script>

<template>
    <TopNav />
    <LangSelector />
    <div id="field"></div>
    <main>
        <header>
            <h1>Contact</h1>
        </header>
    </main>
</template>

<style scoped>
</style>
