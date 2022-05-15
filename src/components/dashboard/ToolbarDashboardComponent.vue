<template>
    <v-navigation-drawer app v-model="drawer" :permanent="!mobile" :temporary="mobile" priority="2" elevation="2" width="300">
        <v-list-item-group>
            <v-list-item v-for="page in pages" :key="page.name" v-bind:style="String(this.$route.name).includes(page.name) ? 'border-radius: 0; border-left: 4px solid #6951FF; background-color: #F4FBFF;' : 'border-left: 0'">
                <router-link :to="page.route">
                    <v-list-item-title>
                        {{ page.name }}
                    </v-list-item-title>
                </router-link>
            </v-list-item>
        </v-list-item-group>
    </v-navigation-drawer>
    <v-app-bar app clipped-left priority="1" fixed>
        <v-app-bar-nav-icon @click="drawer = !drawer" class="d-flex navbar-toggle">
        </v-app-bar-nav-icon>
        <v-app-bar-title>
            <span class="logo">
                <img :src="LogoSrc" alt="ElectroReviewAPI Logo">
            </span>
        </v-app-bar-title>

        <template v-slot:append>
            <v-container class="d-sm-flex">
                <router-link id="back" to="/">back</router-link>
            </v-container>
        </template>
    </v-app-bar>
</template>

<script>
import LogoSrc from "@/assets/review-logo.svg";
export default {
    name: 'ToolbarDashboardComponent',
    props: ['pages'],
    data: () => {
        return {
            LogoSrc,
            drawer: true
        }
    },
    computed: {
        mobile() {
            return (this.$vuetify.display.sm || this.$vuetify.display.xs);
        }
    },
    mounted() {
        if (this.mobile) {
            this.drawer = false;
        }
    }
}
</script>

<style lang="scss" scoped>
a {
    font-family: 'Roboto Condensed', sans-serif;
    padding-right: 0.8rem;
    padding-left: 0.8rem;
    margin: 0.5rem;
    padding-top: 0.4rem;
    padding-bottom: 0.4rem;
    text-decoration: none;
    color: black;
    border-radius: 5px;
    font-weight: bold;
    font-size: 1.1rem;
}

a:hover {
    background-color: rgb(233, 233, 233);
}

.v-app-bar.v-toolbar:not(.v-toolbar--flat) {
    box-shadow: 0px 0px 4px 4px rgb(#000000, 15%);
}

.v-toolbar-title {
    img {
        margin-top: 5px;
        max-width: 200px !important;
        min-width: 50px;
    }
}

#back {
    background-color: #6951FF;
    color: white;

    &:hover {
        background-color: #7f6fec;
    }
}

.logo {
    margin-left: 0.5rem;
}

.v-toolbar__content .v-list-item {
    border-radius: 0;
    margin: 0;

    a {
        width: 100%;
        height: 100%;
    }
}

.navbar-toggle {
    font-size: 1.2rem;
    border-radius: 5px;
    margin-right: 10px;
    margin-left: -5px;
}

.v-list .v-list-item--nav:not(:last-child):not(:only-child) {
    margin-bottom: 0;
}

.v-list {
    padding: 0;
    margin: 0;
}

.v-list-group {
    padding: 0;
}

.v-list-item:hover {
    background-color: rgb(243, 243, 243);
    cursor: pointer;
}

.v-list-item {
    margin: 0;
    padding: 0;
    a {
        height: 100%;
        width: 100%;
        margin: 0;
        padding-top: 1.5rem;
        padding-bottom: 1.5rem;
        text-align: center;
        border-radius: 0;

        &:hover {
            background-color: none !important;
        }
    }
}

.v-list-item-title  {
    font-size: 1.2rem;
    line-height: 1.3rem;
}
</style>