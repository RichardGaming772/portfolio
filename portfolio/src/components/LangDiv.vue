<script>
export default {
    props: {
        divClassString: {
            type: String,
            required: false
        },
        divId: {
            type: String,
            required: false
        },
        engTxt: {
            type: String,
            required: true
        },
        frTxt: {
            type: String,
            required: true
        }
    },
    data() {
        return {
            lang: $cookies.get('lang')
        }
    },
    mounted() {
        this.emitter.on("lang-switch", () => {
            this.lang = $cookies.get('lang');
        });
    }
}
</script>

<template>
    <div :id="divId" :class="divClassString" v-if="lang == 'fr'">{{frTxt}}</div>
    <div :id="divId" :class="divClassString" v-else-if="lang == 'eng'">{{engTxt}}</div>
</template>