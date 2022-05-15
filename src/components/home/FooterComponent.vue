<template>
    <v-footer app bottom absolute width="100vw">
        <v-row>
            <v-col class="copyright" align="end" justify="center">
                <img :src="LogoSrc" alt="ElectroReviewAPI Logo">
            </v-col>
            <v-col class="links">
                <v-row>
                    <button><router-link to="/#home">home</router-link></button>
                </v-row>
                <v-row>
                    <button><router-link to="/#features">features</router-link></button>
                </v-row>
                <v-row>
                    <button><router-link to="/#pricing">pricing</router-link></button>
                </v-row>
                <v-row>
                    <button><router-link to="/login/">login</router-link></button>
                </v-row>
                <v-row>
                    <button><router-link to="/register/">register</router-link></button>
                </v-row>
            </v-col>
        </v-row>
    </v-footer>
</template>

<script>
import LogoSrc from "@/assets/review-logo.svg";

export default {
    name: 'FooterComponent',
    data: () => {
        return {
            LogoSrc
        }
    }
}
</script>

<style lang="scss" scoped>
.v-footer {
    height: 15rem;
    img {
        max-width: 250px;
        margin-right: 20px;
    }
    .links {
        padding-left: 40px;

        button {
            padding: 5px;
            border-radius: 5px;
            min-width: 50px;
            padding: 0.5rem;
        }
    }

    a {
        text-decoration: none;
        color: black;
    }
}
</style>