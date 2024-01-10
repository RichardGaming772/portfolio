<script>
import LangDiv from '@/components/LangDiv.vue';
import TopNav from '@/components/TopNav.vue';
import LangSelector from '@/components/LangSelector.vue';
export default {
    components: { LangSelector, LangDiv, TopNav }
}
</script>

<template>
    <LangSelector />
    <div id="field"></div>
    <main>
        <TopNav />
        <div class="pageBody">
            <header>
                <h1>A propos</h1>
            </header>
            <LangDiv divClassString="ah" divId="divLol" frTxt="Francais" engTxt="Anglais"></LangDiv>
        </div>
    </main>
</template>

<style scoped>
</style>
