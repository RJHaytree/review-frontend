<template>
    <v-container class="home">
        <v-row align="center" justify="center">
            <h1 id="home">{{ header.title }}</h1>
        </v-row>
        <v-row align="center" justify="center">
            <p class="message">Get started today with a <span>free account</span> or browse our premium offers below</p>
        </v-row>
        <v-row align="center" justify="center" class="buttons">
            <button onclick="location.href='/'" type="button" class="register-btn">register</button>
            <button onclick="location.href='#pricing'" type="button" class="pricing-btn">pricing</button>
        </v-row>
    </v-container>
</template>

<script>
export default {
    name: 'HomeComponent',
    data: () => {
        return {
            header: {
                title: "A review service dedicated to simplifying, storing and analysing electronic device reviews.",
            }
        }
    }
}
</script>

<style lang="scss" scoped>
h1#home {
    font-family: 'Roboto Condensed', sans-serif;
    text-align: center;
    max-width: 850px;
    margin-top: 4rem;
    font-size: 2.25rem;
    color: #5E3838;
    font-weight: bolder ;
    min-width: 90%;
}

p.message {
    font-family: 'Roboto Condensed', sans-serif;
    max-width: 475px;
    font-weight: 550;
    text-align: center;
    margin-top: 4rem;
    font-size: 1.25rem;
    min-width: 90%;
}

span {
    color: #6951FF;
}

.buttons {
    margin: 5px;
    margin-top: 4rem;
    margin-bottom: 4rem;

    button {
        min-width: 90px;
        font-family: 'Roboto Condensed', sans-serif;
        border-radius: 5px;
        padding: 8px;
        margin-left: 10px;
        margin-right: 10px;
        font-weight: bold;
        font-size: 1.1rem;

        &.register-btn {
            background-color: #6951FF;
            color: #ffffff;
            border: 2px solid #6951FF;

            &:hover {
                background-color: #7f6fec;
                border: 2px solid #7f6fec;
            }
        }

        &.pricing-btn {
            border: 2px solid #6951FF;
            background-color: #ffffff;
            color: #5E3838;

            &:hover {
                background-color: rgb(245, 245, 245);
            }
        }
    }
}
</style>