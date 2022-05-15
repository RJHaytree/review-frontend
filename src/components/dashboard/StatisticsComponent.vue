<template>
    <div class='statistics'>
        <v-container>
            <v-row>
                <h3>Business Intelligence Statistics</h3>            
            </v-row>
            <v-row class="description">
                <p>Here you can view statistics generated across ElectroReviewAPI under multiple scopes: local and global. A breakdown of these scopes can be found below:</p>
            </v-row>
            <v-row>
                <ul>
                    <li><b>Local:</b> Statistics generated for your organisation based on your submitted reviews.</li>
                    <li><b>Global:</b> Statistics generated using information collected from all our clients.</li>
                </ul>                
            </v-row>
        </v-container>
        <v-container class="local">
            <h3>Local Statistics</h3>
            <v-row>
                <v-expansion-panels>
                    <lowest-avg-local-component name="Products By Lowest Average Rating"/>
                    <highest-avg-local-component name="Products By Highest Average Rating"/>
                    <lowest-count-local-component name="Products By Lowest Number of Reviews"/>
                    <highest-count-local-component name="Products By Highest Number of Reviews"/>
                </v-expansion-panels>
            </v-row>
        </v-container>
        <v-container class="global">
            <h3>Global Statistics</h3>
            <v-row>
                <v-expansion-panels>
                    <leaderboard-component name="Global Leardboard"/>
                    <lowest-avg-global-component name="Global Products By Lowest Average Rating"/>
                    <highest-avg-global-component name="Global Products By Highest Average Rating"/>
                    <recent-component name="Global Recent Reviews"/>
                </v-expansion-panels>
            </v-row>
        </v-container>
    </div>
</template>

<script>
import HighestAvgLocalComponent from './statistics/HighestAvgLocalComponent.vue'
import LowestAvgLocalComponent from './statistics/LowestAvgLocalComponent.vue'
import HighestCountLocalComponent from './statistics/HighestCountLocalComponent.vue'
import LowestCountLocalComponent from './statistics/LowestCountLocalComponent.vue'
import LeaderboardComponent from './statistics/LeaderboardComponent.vue'
import HighestAvgGlobalComponent from './statistics/HighestAvgGlobalComponent.vue'
import LowestAvgGlobalComponent from './statistics/LowestAvgGlobalComponent.vue'
import RecentComponent from './statistics/RecentComponent.vue'

export default {
    name: 'StatisticsComponent',
    components: {
        HighestAvgLocalComponent,
        LowestAvgLocalComponent,
        HighestCountLocalComponent,
        LowestCountLocalComponent,
        HighestAvgGlobalComponent,
        LowestAvgGlobalComponent,
        LeaderboardComponent,
        RecentComponent
    },
    data: () => {
        return {
            url: 'https://electro-review-api-backend.azurewebsites.net/bi'
        }
    },
    methods: {
        get() {
            try {
                this.$store.dispatch("getLowestAvgReviewsLocal");
            }
            catch (e) {
                console.log(e.message)
            }
        }
    }
}
</script>

<style lang="scss" scoped>
.statistics {
    padding: 2rem;

    .v-container {
        font-family: 'Roboto Condensed', sans-serif;
        background-color: #ffffff;
        border-radius: 0.5rem;
        box-shadow: 0px 2px 1px -2px rgb(0 0 0 / 10%), 0px 2px 2px 0px rgb(0 0 0 / 14%), 0px 1px 5px 0px rgb(0 0 0 / 12%) !important;
        margin-bottom: 2rem;
        padding: 3rem;

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

        h3 {
            font-size: 1.8rem;
            margin-bottom: 1.5rem;            
        }

        h4 {
            font-size: 1.4rem;

        }

        p {
            font-size: 1.2rem;
            margin-bottom: 1rem;

            span {
                color: #38BD3D;
            }
        }

        ul {
            margin-top: 1rem;
            margin-left: 1rem;
            font-size: 1.2rem;
        }

        .description {
            margin-top: 2rem;
        }
    }

    .v-row {
        width: 100%;
    }
}
</style>