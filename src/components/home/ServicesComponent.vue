<template>
    <v-container class="services">
        <v-row align="center" justify="center">
            <p>FEATURES OF ELECTROREVIEWAPI</p>
        </v-row>
        <v-row align="center" justify="center">
            <h1 id="features">Why use our services?</h1>
        </v-row>
        <v-row align="center" justify="center">
            <v-col v-for="service in services" :key="service.name" class="service">
                <img :src="service.icon" :alt="service.name" />
                <p class="service-name">{{ service.name }}</p>
                <p class="service-desc">{{ service.description }}</p>
            </v-col>
        </v-row>
    </v-container>
</template>

<script>

export default {
    name: 'ServicesComponent',
    props: {
        services: {
            type: Array
        }
    }
}
</script>

<style lang="scss" scoped>
.services {
    min-width: 90%;
    max-width: 1100px;
    font-family: 'Roboto Condensed', sans-serif;
    margin-top: 2rem;

    p {
        font-size: 0.9rem;
        color: #A1A1A1;
    }

    h1 {
        font-size: 1.7rem;
        margin-top: 1rem;
        font-weight: 500;
    }

    .service {
        margin: 0.9rem;
        margin-top: 2.2rem;
        text-align: center;
        max-width: 260px;

        img {
            max-width: 30%;
        }

        p.service-desc {
            margin-top: 0.9rem;
            color: #7C7C7C;
            font-size: 0.95rem;
        }

        p.service-name {
            color: #000000;
            margin-top: 0.6rem;
            font-size: 1.1rem;
        }
    }
}
</style>