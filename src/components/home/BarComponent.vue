<template>
    <v-row class="midsection">
        <v-container align="center">
            <v-row align="center" justify="space-between">
                <p>Join our mission to support organisations by using reviews to power business decisions</p>
                <router-link to="/register">
                    <button type="button">register for free</button>
                </router-link>
            </v-row>
        </v-container>
    </v-row>
</template>

<script>
export default {
    name: 'BarComponent'
}
</script>

<style lang="scss" scoped>
.midsection {
    font-size: 1.1rem;
    margin-top: 2rem;
    background-color: #c9deeb;
    font-family: 'Roboto Condensed', sans-serif;
    min-height: 90px;

    .v-container {
        min-width: 90%;
        max-width: 1000px;

        .v-row {
            height: 100%;
            margin: 0;
            padding: 1.2rem;
            max-width: 1300px;
        }

        p {
            color: #5E3838;
        }

        button {
            color: black;
            font-weight: 500;

            padding: 10px;
            padding-left: 15px;
            padding-right: 15px;
            border-radius: 5px;
            background-color: #ffffff;
        }
    }
}
</style>