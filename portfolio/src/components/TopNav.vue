<script>
import LangDiv from './LangDiv.vue';
export default {
    methods: {
        pageNav(route) {
            if (route == "/") {
                location.replace(route);
            } else {
                this.$router.push({
                    path: route
                });
            }
        },
        navString: function (text) {
            if (this.$route.path.substring(1) == text) {
                return "navItem currentNavItem";
            } else {
                return "navItem";
            }
        }
    },
    components: { LangDiv }
}
</script>

<template>
    <div class="navBox">
        <nav>
            <LangDiv @click="pageNav('/')" divClassString="navItem" frTxt="Accueil" engTxt="Home" />
            <LangDiv @click="pageNav('about')" v-bind:class="navString('about')" frTxt="A propos" engTxt="About" />
            <LangDiv @click="pageNav('projects')" v-bind:class="navString('projects')" frTxt="Projets"
                engTxt="Projects" />
            <!-- <LangDiv @click="pageNav('skills')" v-bind:class="navString('skills')" frTxt="Compétences"
                engTxt="Skills" /> -->
            <div @click="pageNav('contact')" v-bind:class="navString('contact')" class="navItem">Contact</div>
        </nav>
    </div>
</template>

<style scoped>
nav {
    position: unset;
    transform: unset;
    height: fit-content;
    padding: 20px;
    padding-right: 70px;
    margin: 0;
    flex-wrap: wrap;
    justify-content: flex-start;
}

.navBox {
    width: 100%;
}
</style>
