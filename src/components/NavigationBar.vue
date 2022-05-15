<template>
    <v-app-bar>
        <v-app-bar-nav-icon @click="drawer = !drawer" class="d-flex d-sm-none navbar-toggle"></v-app-bar-nav-icon>
        <v-app-bar-title>
            <span class="logo">
                <img :src="LogoSrc" alt="ElectroReviewAPI Logo">
            </span>
        </v-app-bar-title>

        <template v-slot:append>
            <v-container class="d-none d-sm-flex">
                <router-link to="/">home</router-link>
                <router-link to="/#features">features</router-link>
                <router-link to="/#pricing">pricing</router-link>
                <router-link to="/login/">login</router-link>
                <router-link to="/register/" id="register">register</router-link>
            </v-container>
        </template>
    </v-app-bar>

    <v-navigation-drawer v-model="drawer" absolute temporary style="margin-top: 0; height: 100%;">
        <v-list nav>
            <v-list-item-group>
                <v-list-item>
                    <router-link to="/#home">
                        <v-list-item-title>
                            home
                        </v-list-item-title>
                    </router-link>
                </v-list-item>
                <v-list-item>
                    <router-link to="/#features">
                        <v-list-item-title>
                            features
                        </v-list-item-title>
                    </router-link>
                </v-list-item>
                <v-list-item>
                    <router-link to="/#pricing/">
                        <v-list-item-title>
                            pricing
                        </v-list-item-title>
                    </router-link>
                </v-list-item>
                <v-list-item>
                    <router-link to="/login/">
                        <v-list-item-title>
                            login
                        </v-list-item-title>
                    </router-link>
                </v-list-item>
                <v-list-item>
                    <router-link to="/register/">
                        <v-list-item-title>
                            register
                        </v-list-item-title>
                    </router-link>
                </v-list-item>
            </v-list-item-group>
        </v-list>
    </v-navigation-drawer>
</template>

<script>
import LogoSrc from "@/assets/review-logo.svg";
export default {
    name: "NavigationBar",
    data: () => {
        return {
            drawer: false,
            LogoSrc
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

#register {
    background-color: #6951FF;
    color: white;

    &:hover {
        background-color: #7f6fec;
    }
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

.logo {
    margin-left: 0.5rem;
}

.navbar-toggle {
    font-size: 1.2rem;
    border-radius: 5px;
    margin-right: 10px;
    margin-left: -5px;
}

.v-toolbar__content .v-list-item {
    border-radius: 0;
    margin: 0;

    a {
        width: 100%;
        height: 100%;
    }
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
    background-color: rgb(233, 233, 233);
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