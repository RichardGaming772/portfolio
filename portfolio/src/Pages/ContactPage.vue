<script>
import LangDiv from '@/components/LangDiv.vue';
import TopNav from '@/components/TopNav.vue';
import LangSelector from '@/components/LangSelector.vue';
import VueCookies from 'vue-cookies';
export default {
    data() {
        return {
            lang: $cookies.get('lang')
        }
    },
    components: { LangSelector, LangDiv, TopNav },
    mounted() {
        this.emitter.on("lang-switch", () => {
            this.lang = $cookies.get('lang');
        });
        let fontawesome = document.createElement('script')
        fontawesome.setAttribute('src', 'https://kit.fontawesome.com/4e62a5bed3.js')
        document.head.appendChild(fontawesome)
    },
    methods: {
        isFrench() {
            if ($cookies.get('lang') == "fr") {
                return true;
            } else {
                return false;
            }
        }
    }
}
</script>

<template>
    <LangSelector />
    <div id="field"></div>
    <main>
        <TopNav />
        <div class="pageBody">
            <header>
                <LangDiv divClassString="h1" frTxt="Contactez moi" engTxt="Get in touch"></LangDiv>
            </header>
            <div class="contactBox">
                <div class="contactRow"><LangDiv frTxt="Téléphone :" engTxt="Phone:"></LangDiv><LangDiv frTxt="06 68 77 64 54" engTxt="(+33) 6 68 77 64 54"></LangDiv></div>
                <div class="contactRow"><div>Mail :</div><div>killian.kvella@etu.univ-smb.fr</div></div>
            </div>
            <a v-if="lang == 'fr'" href="/CV/French.pdf" class="downloadButton" download="KVELLA_Killian_CV.pdf"><LangDiv frTxt="Télécharger mon CV" engTxt="Download my CV">
            </LangDiv><i class="fa-solid fa-download"></i></a>
            <a v-if="lang == 'eng'" href="/CV/English.pdf" class="downloadButton" download="KVELLA_Killian_CV.pdf"><LangDiv frTxt="Télécharger mon CV" engTxt="Download my CV">
            </LangDiv><i class="fa-solid fa-download"></i></a>
        </div>
    </main>
</template>

<style scoped>
main {
    min-height: 100%;
    justify-content: flex-start;
    overflow: auto;
}
.contactBox{
    width: 250px;
}
.contactRow{
    display: flex;
    width: 100%;
    justify-content: space-between;
}
.downloadButton {
    font-size: medium;
    text-decoration: none;
    color: white;
    background-color: rgb(85, 85, 85, 0.5);
    display: flex;
    flex-direction: row;
    align-items: center;
    gap: 5px;
    padding: 5px;
    border-radius: 5px;
    cursor: pointer;
    transition: all ease 0.5s;
}

.downloadButton:hover {
    background-color: rgb(116, 116, 116, 0.5);
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
