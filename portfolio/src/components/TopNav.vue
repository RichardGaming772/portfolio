<script>
import LangDiv from './LangDiv.vue';
export default {
    methods: {
        pageNav(route) {
            this.$router.push({
                path: route
            });
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
    <nav>
        <LangDiv @click="pageNav('/')" divClassString="navItem" frTxt="Accueil" engTxt="Home" />
        <LangDiv @click="pageNav('about')" v-bind:class="navString('about')" frTxt="A propos" engTxt="About" />
        <LangDiv @click="pageNav('projects')" v-bind:class="navString('projects')" frTxt="Projets" engTxt="Projects" />
        <div @click="pageNav('contact')" v-bind:class="navString('contact')" class="navItem">Contact</div>
    </nav>
</template>

<style scoped>
nav {
    position: unset;
    z-index: 15;
    transform: unset;
    width: fit-content;
    height: fit-content;
    padding-left: 20px;
    padding-top: 20px;
    margin: 0;
    flex-wrap: wrap;
}
</style>
