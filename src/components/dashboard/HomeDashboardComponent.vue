<template>
    <div class='dashboard'>
        <v-container class="notification">
            <v-alert type="error" border="start" contained v-if="error" v-model="showErrorAlert" closable>
                <v-alert-title>An Error has Occurred</v-alert-title>
                <p>{{ error }}</p>
            </v-alert>
            <v-alert type="success" border="start" contained v-if="success" v-model="showSuccessAlert" closable>
                <v-alert-title>Success</v-alert-title>
                <p>{{ success }}</p>
            </v-alert>
        </v-container>
        <v-container>
            <v-row>
                <h1>{{ welcome.title }}</h1>
            </v-row>
            <v-row>
                <p>{{  welcome.message + user.username }}</p>
            </v-row>
        </v-container>
        <v-container class="subscription">
            <v-row>
                <v-col>
                    <h2>{{ subscription.heading }}</h2>
                </v-col>
                <v-col>
                    <button @click="manage = !manage">manage</button>
                </v-col>
            </v-row>
            <v-row>
                <p>Current subscription: <span>{{ getActiveSubscriptionType }}</span></p>
            </v-row>
            <v-row>
                <p>Interval: <span>{{ getActiveSubscriptionInterval }}</span></p>
            </v-row>
        </v-container>
        <v-container v-if="manage" class="manage">
            <v-row>
                <h3>Manage Subscriptions</h3>
            </v-row>
            <!-- current subscription + cancel button -->
            <div>
                <v-row v-if="getActiveSubscriptionType == 'FREE'" class="free">
                    <p>You have no active subscriptions.</p>
                </v-row>
            </div>
            <!-- if no susbcription, allow one to be added (cards for premium + MONTH/ANNUAL -->
            <div v-if="getActiveSubscriptionType == 'FREE'" class="free">
                <v-row>
                    <v-col cols="12" sm="6" v-for="sub in subscriptions" :key="sub.name">
                        <v-card align="center" jusify="center" elevation="2">
                            <h3 :id="sub.name">{{ sub.name.toUpperCase() }}</h3>
                            <v-divider></v-divider>
                            <p> {{ sub.pricing }} </p>
                            <v-divider></v-divider>
                            <ul>
                                <li v-for="f in sub.features" :key="f.id">{{ f.name }}</li>
                            </ul>
                            <button @click="selectSubscription(sub)">subscribe
                            </button>
                        </v-card>                    
                    </v-col>
                </v-row>
            </div>
            <div v-if="getActiveSubscriptionType == 'PREMIUM'" class="premium">
                <p>Current active subscription: </p>
                <v-card elevation="2" align="center" justify="center">
                    <v-table style="width: 100%" fixed-header>
                        <thead>
                            <tr>
                                <th class="text-center">
                                    Subscription Tier
                                </th>
                                <th class="text-center">
                                    Interval
                                </th>
                                <th class="text-center">
                                    Pricing
                                </th>
                                <th class="text-center">
                                    Date Started
                                </th>
                            </tr>
                        </thead>
                        <tbody>
                            <tr>
                                <td class="text-center">
                                    {{ getActiveSubscriptionType }}
                                </td>
                                <td class="text-center">
                                    {{ getActiveSubscriptionInterval }}
                                </td>
                                <td class="text-center">
                                    {{ getActiveSubscriptionPrice }}
                                </td>
                                <td class="text-center">
                                    {{ getActiveSubscriptionStartDate }}
                                </td>
                            </tr>
                        </tbody>
                    </v-table>
                    <button @click="initiateCancel">cancel subscription</button>
                </v-card>
            </div>

            <h4>Previous Subscriptions</h4>

            <div class="cancelled" align="center" justify="center">
                <div v-if="getCancelledSubscriptions != 'N/A'">
                    <v-table fixed-header>
                        <thead>
                            <tr>
                                <th class="text-center">Date Started</th>
                                <th class="text-center">Date Ended</th>
                                <th class="text-center">Susbcription Tier</th>
                                <th class="text-center">Interval</th>
                            </tr>
                        </thead>
                        <tbody>
                            <tr v-for="sub in getCancelledSubscriptions" :key="sub.id">
                                <td class="text-center">{{ formatDate(sub.date_started) }}</td>
                                <td class="text-center">{{ formatDate(sub.date_ended) }}</td>
                                <td class="text-center">PREMIUM</td>
                                <td class="text-center">{{ sub.interval }}</td>
                            </tr>
                        </tbody>
                    </v-table>
                </div>
                <div v-else class="no-cancelled">
                    <v-row justify="center" align="center"><p>You have no previously cancelled subscriptions.</p></v-row>
                </div>
            </div>

            <!-- dialog boxes for confirmation -->
            <v-dialog v-model="dialog" max-width="400" :retain-focus="false">
                <v-card>
                    <v-card-title class="text-h5">{{ chosenSubscription.name }} Subscription Plan</v-card-title>
                    <v-divider></v-divider>
                    <v-card-text>Are you sure want to subscribe to the <span class="sub-tier"> Premium {{ chosenSubscription.name }}</span> plan for <span class="pricing">{{ chosenSubscription.pricing }}</span>?</v-card-text>
                    <v-card-actions>
                        <v-spacer></v-spacer>
                        <v-btn color="green darken-1" @click="addSubscription">
                            Yes
                        </v-btn>
                        <v-btn color="red lighten-1" @click="dialog = !dialog">
                            No
                        </v-btn>
                    </v-card-actions>
                </v-card>
            </v-dialog>
            <v-dialog v-model="cancelDialog" max-width="400" :retain-focus="false">
                <v-card>
                    <v-card-title class="text-h5">Subscription Cancellation</v-card-title>
                    <v-divider></v-divider>
                    <v-card-text>Are you sure you want to cancel your existing subscription? To restore your subscription you will need to create a new one.</v-card-text>
                    <v-card-actions>
                        <v-spacer></v-spacer>
                        <v-btn color="green darken-1" @click="cancelSubscription">
                            Yes
                        </v-btn>
                        <v-btn color="red lighten-1" @click="cancelDialog = !cancelDialog">
                            No
                        </v-btn>
                    </v-card-actions>
                </v-card>
            </v-dialog>
        </v-container>
    </div>
</template>

<script>
import moment from 'moment';

export default {
    name: 'HomeDashboardComponent',
    components: {
    },
    data: () => {
        return {
            welcome: { 
                title: 'Home', 
                message: `Welcome back, `
            },
            subscription: {
                heading: 'Subscription'
            },
            manage: false,
            subscriptions: [{
                name: 'Month',
                pricing: '£15/per month',
                features: [
                    {
                        id: 1, 
                        name: 'review storage'
                    },
                    {
                        id: 2,
                        name: 'RESTful API'
                    },
                    {
                        id: 3, 
                        name: 'business intelligence'
                    }
                ]
            }, {
                name: 'Annual',
                pricing: '£150/per annum',
                features: [
                    {
                        id: 1, 
                        name: 'review storage'
                    },
                    {
                        id: 2,
                        name: 'RESTful API'
                    },
                    {
                        id: 3, 
                        name: 'business intelligence'
                    }
                ]
            }],
            chosenSubscription: {},
            dialog: false,
            cancelDialog: false,
            error: '',
            success: '',
            showErrorAlert: false,
            showSuccessAlert: false
        }
    },
    methods: {
        formatDate: function(date) {
            let jsDate= new Date(date);
            return moment(jsDate).format('l');
        },
        selectSubscription: function(subscription) {
            this.chosenSubscription = subscription;
            this.dialog = !this.dialog;
        },
        async addSubscription() {
            let interval = this.chosenSubscription.name.toUpperCase();
            this.error = '';
            this.success = '';

            try {
                await this.$store.dispatch('addSubscription', interval);
                this.success = 'Subscription updated successfully.'
                this.dialog = !this.dialog
                this.showSuccessAlert = true;
            }
            catch (e) {
                this.error = 'Something went wrong when adding your subscription. Contact an administrator.';
                this.showErrorAlert = true;
            }
        },
        initiateCancel: function() {
            this.cancelDialog = !this.cancelDialog;
        },
        async cancelSubscription() {
            let sub = this.$store.getters.activeSubscription;
            let id = sub[0].id;

            try {
                await this.$store.dispatch('cancelSubscription', id);
                this.success = 'Subscription successfully cancelled.'
                this.cancelDialog = !this.cancelDialog;
                this.showSuccessAlert = true;
            }
            catch (e) {
                this.error = 'Something went wrong when canceling your subscription. Contact and administrator.'
                this.showErrorAlert = true;
            }
        }
    },
    computed: {
        user() {
            return this.$store.getters.user;
        },
        getActiveSubscriptionType() {
            let sub = this.$store.getters.activeSubscription;
            if (sub.length > 0) return 'PREMIUM'

            return 'FREE'
        },
        getActiveSubscriptionInterval() {
            let sub = this.$store.getters.activeSubscription;
            if (sub.length > 0) return sub[0].interval;

            return 'N/A'
        },
        getActiveSubscriptionStartDate() {
            let sub = this.$store.getters.activeSubscription;
            if (sub.length > 0) {
                let date = new Date(sub[0].date_started);
                let formatted = moment(date).format('l');

                return formatted;
            }

            return 'N/A'
        },
        getActiveSubscriptionPrice() {
            let sub = this.$store.getters.activeSubscription;
            let interval = sub[0].interval;
            if (interval == 'MONTH') return this.subscriptions[0].pricing;
            if (interval == 'ANNUAL') return this.subscriptions[1].pricing;

            return 'N/A'
        },
        getCancelledSubscriptions() {
            let cancelled = this.$store.getters.cancelledSubscriptions;

            if (cancelled.length > 0) return cancelled;

            return 'N/A'
        }
    },
    mounted() {
        this.$store.dispatch("getSubscription");
    }
}
</script>

<style lang="scss" scoped>

.dashboard {
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
        }

        h4 {
            font-size: 1.4rem;
            margin-top: 1.5rem;
        }

        p {
            font-size: 1.2rem;
            color: #5E3838;
            margin-bottom: 1rem;

            span {
                color: #38BD3D;
            }
        }

        &.subscription {
            .v-col {
                padding: 0;
                padding-top: 1rem;
            }

            padding-right: 3rem;
            padding-left: 3rem;
            padding-bottom: 3rem;
            padding-top: 2rem;
            position: relative;
            
            button {
                background-color: #EAFBFF;
                padding: 1rem;
                padding-right: 3rem;
                padding-left: 3rem;
                color: #5E3838;
                border-radius: 0.5rem;
                position: absolute;
                top: 0;
                right: 0;
                margin: 1rem;

                &:hover {
                    background-color: #d4f4fc;
                }
            }
        }
        .v-card {
            padding: 1.5rem;
            background-color: #f6fdff;

            h3 {
                font-size: 1.5rem;
                margin-bottom: 1rem;
                &#month {
                    color: rgb(255, 248, 248);
                }

                &#annual {
                    color: rgb(223, 189, 0);
                }
            }

            p {
                padding-top: 1rem;
                font-size: 1.3rem;
            }

            ul {
                margin-top: 1rem;
                font-size: 1.1rem;
                list-style: none;
            }

            button {
                margin-top: 1.5rem;
                padding: 0.5rem;
                padding-left: 1.5rem;
                padding-right: 1.5rem;
                font-size: 1.2rem;
                border-radius: 0.5rem;
                background-color: #d4f4fc;

                &:hover {
                    background-color: #bbf1ff;
                }
            }
        }
    }
}

.v-container.manage .free {
    p {
        padding-bottom: 1rem;
        color: red;
    }
}

.v-container.manage {
    h3 {
        margin-bottom: 2.5rem;
    }
}

.v-dialog .v-overlay__content {
    .v-card {
        padding: 1rem;
    }

    .v-divider {
        margin-bottom: 1rem;
    }

    .v-card-title {
        text-align: center;
    }

    .v-card-actions {
        justify-content: center;
    }

    .sub-tier {
        color: rgb(42, 42, 255);
    }

    .pricing {
        color: rgb(185, 0, 0);
    }
}

.premium {
    table {
        background-color: #f6fdff !important;

        thead tr th, tbody tr td {
            font-size: 1.1rem;
            background-color: #f6fdff !important;
        }

        tbody td {
            font-size: 1.2rem !important;
            color: #38BD3D;
        }
    }

    .v-row {
        padding-right: 3rem;
        padding-left: 3rem;

        p {
            font-size: 1.1rem !important;
            color: #38BD3D;
        }
    }

    .v-card button {
        font-size: 1rem !important;
        margin-top: 1rem;
        background-color: rgb(180, 28, 28) !important;
        color: white;

        &:hover {
            background-color: rgb(212, 88, 88) !important;
        }
    }
}

.notification {
    padding: 0 !important;
    margin-bottom: 0 !important;

    .v-alert {
        margin-bottom: 2rem;
    }
    
    p {
        color: #ffffff !important;
    }
}

.cancelled {
    table {
        background-color: #f6fdff !important;

        thead tr th, tbody tr td {
            font-size: 1.1rem;
        }
    }

    padding: 3rem;
    .v-divider {
        margin-bottom: 1rem;
    }

    .no-cancelled {
        p {
            color: #38BD3D;
        }
    }
}
</style>