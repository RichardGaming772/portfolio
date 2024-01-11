<script>
import LangDiv from '@/components/LangDiv.vue';
import TopNav from '@/components/TopNav.vue';
import LangSelector from '@/components/LangSelector.vue';
import pageData from '../assets/data/text.json'
export default {
    components: { LangSelector, LangDiv, TopNav },
    mounted() {
        let fontawesome = document.createElement('script')
        fontawesome.setAttribute('src', 'https://kit.fontawesome.com/4e62a5bed3.js')
        document.head.appendChild(fontawesome)
    },
    data() {
        return {
            articles: pageData,
        };
    },
}
</script>

<template>
    <LangSelector />
    <div id="field"></div>
    <main>
        <TopNav />
        <div class="pageBody">
            <header>
                <LangDiv divClassString="h1" frTxt="Qui suis-je ?" engTxt="Who am I ?"></LangDiv>
            </header>
            <LangDiv divClassString="pageArticle"
                :frTxt="articles[4].fr"
                :engTxt="articles[4].eng"></LangDiv>
                <LangDiv divClassString="pageArticle"
                    :frTxt="articles[5].fr"
                    :engTxt="articles[5].eng"></LangDiv>
        </div>
    </main>
</template>

<style scoped>
main {
    min-height: 100%;
    justify-content: flex-start;
    overflow: auto;
}

html, body {
    background-color: black;
    overscroll-behavior: auto;
}
.field{
    position: fixed;
}
body {
    background-color: black;
}

.pageArticle {
    width: 30%;
    text-align: justify;
    min-width: 250px;
}

.iconLinkBox {
    display: flex;
    flex-direction: row;
    gap: 50px;
}

a {
    text-decoration: none;
    color: white;
    font-size: xx-large;
}
</style>
