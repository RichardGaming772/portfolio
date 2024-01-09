<script>
import LangDiv from '@/components/LangDiv.vue';
import LangSelector from '@/components/LangSelector.vue';
export default {
    components: { LangSelector, LangDiv }
}
</script>

<template>
    <LangSelector />
    <div id="field"></div>
    <main>
        <header>
            <h1>A propos</h1>
        </header>
        <LangDiv divClassString="ah" divId="divLol" frTxt="Francais" engTxt="Anglais"></LangDiv>
    </main>
</template>

<style scoped>
</style>
