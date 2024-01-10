<script>
import LangDiv from '@/components/LangDiv.vue';
import TopNav from '@/components/TopNav.vue';
import LangSelector from '@/components/LangSelector.vue';
export default {
    components: { LangSelector, LangDiv, TopNav },
    mounted() {
        let fontawesome = document.createElement('script')
        fontawesome.setAttribute('src', 'https://kit.fontawesome.com/4e62a5bed3.js')
        document.head.appendChild(fontawesome)
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
                <LangDiv divClassString="h1" frTxt="Qui suis-je ?" engTxt="Who am I ?"></LangDiv>
            </header>
            <LangDiv divClassString="pageArticle" divId=""
                frTxt="Quisque ullamcorper placerat ipsum. Cras nibh. Morbi vel justo vitae lacus tincidunt ultrices. Lorem ipsum dolor sit amet, consectetuer adipiscing elit. In hac habitasse platea dictumst. Integer tempus convallis augue. Etiam facilisis. Nunc elementum fermentum wisi. Aenean placerat. Ut imperdiet, enim sed gravida sollicitudin, felis odio placerat quam, ac pulvinar elit purus eget enim. Nunc vitae tortor. Proin tempus nibh sit amet nisl. Vivamus quis tortor vitae risus porta vehicula."
                engTxt="AnSed varius, nulla vitae tincidunt lobortis, nibh ipsum sollicitudin libero, et commodo tellus massa in neque. Nulla facilisi. Aenean nec lectus. Aliquam fermentum. Duis ut magna et augue interdum gravida. Morbi elit. Fusce malesuada tempus ipsum. Cum sociis natoque penatibus et magnis dis parturient montes, nascetur ridiculus mus. Mauris iaculis enim non metus. Nullam dui magna, congue et, suscipit sed, aliquam vel, turpis. Quisque ultricies.glais">
            </LangDiv>
            <LangDiv divClassString="h1" frTxt="Liens" engTxt="Links"></LangDiv>
            <div class="iconLinkBox">
                <a href="https://linkedin.com/in/killian-k-vella-280490227">
                    <i class="fa-brands fa-linkedin"></i>
                </a>
                <a href="https://github.com/RichardGaming772">
                    <i class="fa-brands fa-github"></i>
                </a>
            </div>
        </div>
    </main>
</template>

<style scoped>
.pageArticle {
    width: 30%;
    text-align: justify;
    min-width: 250px;
}
.iconLinkBox{
    display: flex;
    flex-direction: row;
    gap: 50px;
}
a{
    text-decoration: none;
    color: white;
    font-size: xx-large;
}
</style>
