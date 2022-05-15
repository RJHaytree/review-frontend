<template>
    <v-container>
        <v-row>
            <h1 v-if="title"> {{ title }} </h1>
        </v-row>
        <v-row>
            <h2 v-if="heading">{{ heading }}</h2>
        </v-row>
        <v-row>
            <p v-if="message"> {{ message }}</p>
        </v-row>
        <v-row v-if="subscription" class="subscription">
            <div>
                <p>Current susbcription: <span >{{ getSusbcriptionType(subscription) }}</span></p>
                <p>Interval: <span>{{ subscription[0].interval }}</span></p>
            </div>
        </v-row>
    </v-container>
</template>

<script>
export default {
    name: 'SectionComponent',
    props: ['title', 'heading', 'message', 'subscription'],
    methods: {
        getSusbcriptionType(subscription) {
            if (subscription.length > 0) {
                return 'PREMIUM'
            }
            else {
                return 'FREE'
            }
        }
    }
}
</script>

<style lang="scss" scoped>
.v-container {
    font-family: 'Roboto Condensed', sans-serif;
    background-color: #ffffff;
    border-radius: 0.5rem;
    box-shadow: 0px 2px 1px -2px rgb(0 0 0 / 10%), 0px 2px 2px 0px rgb(0 0 0 / 14%), 0px 1px 5px 0px rgb(0 0 0 / 12%) !important;
    padding: 3rem;
    margin-bottom: 2rem;

    h1 {
        margin-bottom: 3rem;
        font-size: 2.7rem;
        font-weight: bold;
    }

    h2 {            
        margin-bottom: 3rem;
        font-size: 1.8rem;
        font-weight: bold;
    }

    p {
        font-size: 1.2rem;
        color: #5E3838;
    }

    .subscription {
        span {
            color: #38BD3D;
        }
    }
}
</style>