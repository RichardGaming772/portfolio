<script>
import LangDiv from '../components/LangDiv.vue';
import TopNav from '../components/TopNav.vue';
import LangSelector from '../components/LangSelector.vue';
import pageData from '../assets/data/skillsText.json';

export default {
    components: { LangDiv, TopNav, LangSelector },
    mounted() {
        let fontawesome = document.createElement('script')
        fontawesome.setAttribute('src', 'https://kit.fontawesome.com/4e62a5bed3.js')
        document.head.appendChild(fontawesome);
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
                <LangDiv divClassString="h1" frTxt="Compétences" engTxt="Skills"></LangDiv>
            </header>
            <div class="skillBoard">
                <div v-for="col in articles" class="boardRow">
                    <div class="gridTitleCol">
                        <LangDiv divClassString="gridTitle" :frTxt="col.catFr" :engTxt="col.catEng"></LangDiv>
                    </div>
                    <div class="gridCol2">
                        <div v-for="item in col.texts" class="innerRow">
                            <LangDiv divClassString="exTitle" :frTxt="item.titleFr" :engTxt="item.titleEng"></LangDiv>
                            <LangDiv divClassString="pageArticle" :frTxt="item.fr" :engTxt="item.eng">
                            </LangDiv>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    </main>
</template>

<style scoped>
main {
    min-height: 100%;
    justify-content: flex-start;
    overflow: auto;
}

.exTitle {
    font-size: larger;
    font-weight: bold;
    background-color: rgba(128, 128, 128, 0.075);
    padding: 10px;
    border-bottom: solid 2px rgba(116, 116, 116, 0.5);
}

.innerRow:nth-child(odd) {
    background-color: rgba(128, 128, 128, 0.199);
}

html,
body {
    background-color: black;
    overscroll-behavior: auto;
}

.field {
    position: fixed;
}

body {
    background-color: black;
}

.pageArticle {
    text-align: justify;
    min-width: 250px;
    padding: 10px;
    border-left: solid 2px rgba(116, 116, 116, 0.5);
}

.skillBoard {
    width: 50%;
    perspective: 1px;
    border-collapse: separate;
}

.boardRow {
    display: grid;
    grid-template-columns: 1fr 2fr;
}

.boardRow:first-child {
    border-top-left-radius: 5px;
    border-top-right-radius: 5px;
    overflow: hidden;
}

.gridCol2 {
    display: flex;
    flex-direction: column;
}

.gridTitleCol {
    font-size: larger;
    font-weight: bold;
    background-color: rgba(128, 128, 128, 0.075);
    text-align: center;
}

.gridTitle {
    background-color: rgba(128, 128, 128, 0.199);
    text-align: center;
    padding: 10px;
    border-bottom: solid 2px rgba(116, 116, 116, 0.5);
}

.pageBody {
    margin-bottom: 20px;
    height: unset;
}
</style>
