<script>
import LangDiv from '@/components/LangDiv.vue';
import TopNav from '@/components/TopNav.vue';
import LangSelector from '@/components/LangSelector.vue';
import pageData from '../assets/data/text.json'
export default {
    components: { LangSelector, LangDiv, TopNav },
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
                <LangDiv divClassString="h1" frTxt="Projets" engTxt="Projects"></LangDiv>
            </header>
            <div class="projectBlock">
                <div class="imageBox">
                    <div class="projectImages longImages">
                        <img src="../assets/imgs/Projects/Puzzle/MainPage.png" class="firstImage projImg">
                        <img src="../assets/imgs/Projects/Puzzle/VisPage.png" class="secondImage projImg">
                    </div>
                </div>
                <div class="projectBlockBody">
                    <div class="row">
                        <div class="projectName">A Puzzle A Day - </div>
                        <LangDiv divClassString="projDetails" frTxt="Projet Personnel" engTxt="Personal Project"></LangDiv>
                    </div>
                    <LangDiv divClassString="projectDesc"
                        :frTxt="articles[0].fr"
                        :engTxt="articles[0].eng"></LangDiv>
                    <div class="projectTechnos">
                        <img src="../assets/imgs/Technologies/node.png" height="50px">
                        <img src="../assets/imgs/Technologies/sqlite.png" height="50px">
                    </div>
                </div>
            </div>
            <div class="projectBlock">
                <div class="imageBox">
                    <div class="projectImages tallImages">
                        <img src="../assets/imgs/Projects/GrimoucManager/PlayerPage.png" class="firstImage projImg">
                        <img src="../assets/imgs/Projects/GrimoucManager/SideBar.png" class="secondImage projImg">
                    </div>
                </div>
                <div class="projectBlockBody">
                    <div class="row">
                        <div class="projectName">Grimouc Manager - </div>
                        <LangDiv divClassString="projDetails" frTxt="Projet Personnel" engTxt="Personal Project"></LangDiv>
                    </div>
                    <LangDiv divClassString="projectDesc"
                        :frTxt="articles[1].fr"
                        :engTxt="articles[1].eng"></LangDiv>
                    <div class="projectTechnos">
                        <img src="../assets/imgs/Technologies/node.png" height="50px">
                        <img src="../assets/imgs/Technologies/flutter.png" height="50px">
                        <img src="../assets/imgs/Technologies/postgres.png" height="50px">
                    </div>
                </div>
            </div>
            <div class="projectBlock">
                <div class="imageBox">
                    <div class="projectImages longImages">
                        <img src="../assets/imgs/Projects/ClubMed/RoomPage.png" class="firstImage projImg">
                        <img src="../assets/imgs/Projects/ClubMed/SearchPage.png" class="secondImage projImg">
                    </div>
                </div>
                <div class="projectBlockBody">
                    <div class="row">
                        <div class="projectName">ClubMed - </div>
                        <LangDiv divClassString="projDetails" frTxt="Projet Universitaire" engTxt="University Project">
                        </LangDiv>
                    </div>
                    <LangDiv divClassString="projectDesc"
                        :frTxt="articles[2].fr"
                        :engTxt="articles[2].eng"></LangDiv>
                    <div class="projectTechnos">
                        <img src="../assets/imgs/Technologies/laravel.png" height="50px">
                        <img src="../assets/imgs/Technologies/php.png" height="50px">
                        <img src="../assets/imgs/Technologies/postgres.png" height="50px">
                    </div>
                </div>
            </div>
            <div class="projectBlock">
                <div class="imageBox">
                    <div class="projectImages longImages">
                        <img src="../assets/imgs/Projects/CineSaxel/SearchPage.png" class="firstImage projImg">
                        <img src="../assets/imgs/Projects/CineSaxel/IMDBInfoPage.png" class="secondImage projImg">
                    </div>
                </div>
                <div class="projectBlockBody">
                    <div class="row">
                        <div class="projectName">Ciné Saxel - </div>
                        <LangDiv divClassString="projDetails" frTxt="Projet Personnel" engTxt="Personal Project"></LangDiv>
                    </div>
                    <LangDiv divClassString="projectDesc"
                        :frTxt="articles[3].fr"
                        :engTxt="articles[3].eng"></LangDiv>
                    <div class="projectTechnos">
                        <img src="../assets/imgs/Technologies/php.png" height="50px">
                        <img src="../assets/imgs/Technologies/postgres.png" height="50px">
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

html, body {
    background-color: black;
    overscroll-behavior: auto;
}

.projectDesc {
    text-align: justify;
    font-size: small;
    padding-bottom: 10px;
    padding-top: 10px;
}

.projectImages {
    width: 100%;
    position: relative;
    vertical-align: middle;
    display: flex;
    height: 100%;
}

.field{
    position: fixed;
}
.row {
    display: flex;
    flex-direction: row;
    align-items: center;
    gap: 5px;
}

.projectTechnos {
    padding-top: 20px;
    border-top: solid 1px rgba(255, 255, 255, 0.5);
    display: flex;
    flex-direction: row;
    flex-wrap: wrap;
    justify-content: space-between;
}

.projectBlock {
    display: grid;
    grid-template-columns: 40% 1fr;
    width: 30%;
    margin-bottom: 20px;
    padding-bottom: 2%;
}


.projImg {
    position: absolute;
    top: 0;
    width: 60%;
    border-radius: 5px;
    transition: all ease 1s;
    border: white 1px solid;
}

.longImages .projImg {
    width: 75%;
}

.firstImage {
    left: 0;
    transform: rotate(-2deg);
    z-index: 1;
}

.secondImage {
    left: 30%;
    transform: rotate(2deg);
}

.longImages .secondImage {
    top: 40%;
    left: 10%;
    transform: rotate(2deg);
}

.projImg:hover {
    transform: scale(1.5);
    z-index: 10;
}

.longImages .projImg:hover {
    transform: scale(2);
    z-index: 10;
}

.projectBlockBody {
    display: flex;
    flex-direction: column;
    height: 100%;
}

.imageBox {
    display: flex;
    align-items: center;
}

.projectName {
    font-size: large;
    font-weight: bold;
}

.projDetails {
    font-size: small;
}

@media screen and (max-width: 650px) {
    .projectBlock {
        width: 90%;
    }

    .projImg:hover {
        transform: scale(2) translateX(20px);
        z-index: 10;
    }

    .longImages .projImg:hover {
        transform: scale(2.5) translateX(35%);
        z-index: 10;
    }
}

@media screen and (max-width: 1150px) and (min-width: 650px) {
    .projectBlock {
        width: 50%;
    }
}
</style>
