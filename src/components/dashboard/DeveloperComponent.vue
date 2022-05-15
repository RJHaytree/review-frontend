<template>
    <div class='developer'>
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
                <h2>API Keys</h2>
            </v-row>
            <v-row>
                <p>Manage your organisation's API keys.</p>
            </v-row>
            <v-row justify="center" align="center" class="keys">
                <v-card elevation="2">
                    <v-table fixed-header style="width: 100%;" v-if="apiKeys.length > 0">
                        <thead>
                            <tr>
                                <th>Key</th>
                                <th class="text-center">Date Generated</th>
                                <th class="text-center">Enabled</th>
                            </tr>
                        </thead>
                        <tbody>
                            <tr v-for="key in apiKeys" :key="key.id">
                                <td class="text-left">
                                    <button class="copy" v-clipboard:copy="key.key" v-clipboard:success="onCopy">
                                        {{ key.key }}
                                    </button>
                                </td>
                                <td class="text-center">
                                    {{ formatDate(key.date_generated) }}
                                </td>
                                <td class="text-center">
                                    <button class="toggle" @click="toggleApiKey(key.id)" v-bind:class="formatIntToBool(key.enabled)">
                                        {{ formatIntToBool(key.enabled) }}
                                    </button>
                                </td>
                            </tr>
                        </tbody>
                    </v-table>
                    <p v-if="apiKeys.length <= 0" class="not-found" align="center" justify="center">
                        No API keys found</p>  
                </v-card>
            </v-row>
            <v-row align="center" justify="start">
                <button class="gen" @click="addApiKey()">
                    Generate API Key
                </button>      
            </v-row>    
        </v-container>

        <v-container class="item-register">
            <v-row>
                <h2>Item Registry</h2>     
            </v-row>
            <v-row>
                <p>Browse our item registry to find the IDs of your products. If no item exists that matches the one you need, simply add a new item.</p>
            </v-row>
            <v-row align="center" justify="center">
                <v-card elevation="2">
                    <h5>Filters</h5>
                    <v-form class="filter" @submit.prevent="filter" @keydown.enter="filter">
                        <v-row>
                            <v-col cols="12" sm="6">
                                <v-text-field color="#6951FF" label="item name" variant="outlined" style="width: 100%" v-model="nameFilter" clearable>
                                </v-text-field>
                            </v-col>
                            <v-col cols="12" sm="6">
                                <v-combobox color="#6951FF" v-model="brandFilter" :items="brands" label="brand" variant="outlined" clearable></v-combobox>
                            </v-col>
                        </v-row>
                    </v-form>
                </v-card>
            </v-row>
            <v-row class="item-table" align="center" justify="center">
                <v-card elevation="2">
                    <v-table fixed-header style="width: 100%;" height="400px">
                        <thead>
                            <tr>
                                <th>ID</th>
                                <th>Name</th>
                                <th>Brand</th>
                            </tr>
                        </thead>
                        <tbody v-if="sortedItems.length <= 0">
                            <tr v-for="item in items" :key="item.id">
                                <td>{{ item.id }}</td>
                                <td>{{ item.name }}</td>
                                <td>{{ item.brand }}</td>
                            </tr>
                        </tbody>
                        <tbody v-if="sortedItems.length > 0">
                            <tr v-for="item in sortedItems" :key="item.id">
                                <td>{{ item.id }}</td>
                                <td>{{ item.name }}</td>
                                <td>{{ item.brand }}</td>
                            </tr>
                        </tbody>
                    </v-table>
                </v-card>
            </v-row>
            <v-row align="center" justify="center">
                <v-card elevation="2">
                    <h5>Add Item</h5>
                    <v-form v-model="valid" class="add" @submit.prevent="validate">
                        <v-row>
                            <v-col cols="12" sm="5">
                                <v-text-field color="#6951FF" label="item name" variant="outlined" style="width: 100%" v-model="itemName" :counter="50" :rules="[itemNameRules.required]" required shaped clearable>
                                </v-text-field>
                            </v-col>
                            <v-col cols="12" sm="5">
                                <v-text-field color="#6951FF" label="item brand" variant="outlined" style="width: 100%" v-model="itemBrand" :counter="50" :rules="[itemBrandRules.required]" required shaped clearable>
                                </v-text-field>
                            </v-col>
                            <v-col cols="12" sm="2" >
                                <button type="submit" align="center" justify="center" style="width: 100%">Add Item</button>
                            </v-col>
                        </v-row>
                    </v-form>
                </v-card>
            </v-row>
        </v-container>
        <v-snackbar v-model="snackbar" timeout="1500" color="success">
            <p class="text-center">API key copied successfully.</p>
        </v-snackbar>
    </div>
</template>

<script>
import moment from 'moment';

export default {
    name: 'DeveloperComponent',
    data: () => {
        return {
            success: '',
            nameFilter: '',
            brandFilter: '',
            error: '',
            showSuccessAlert: false,
            showErrorAlert: false,
            snackbar: false,
            sortedItems: [],
            itemBrand: '',
            itemBrandRules: {
                required: v => !!v || 'Brand is required'
            },
            itemName: '',
            itemNameRules: {
                required: v => !!v || 'Item name is required'
            },
            valid: false
        }
    },
    methods: {
        formatDate: function(date) {
            let JsDate = new Date(date);
            let formatted = moment(JsDate).format('l');

            return formatted;
        },
        toggleApiKey: async function(id) {
            this.showErrorAlert = false;
            this.showSuccessAlert = false;

            try {
                await this.$store.dispatch("toggleApiKey", id);
                this.success = 'API key successfully toggled.'
                this.showSuccessAlert = true;
            }
            catch (e) {
                this.error = e.message;
                this.showErrorAlert = true;
            }
        },
        formatIntToBool: function(int) {
            if (int == '0') return 'disabled';
            if (int == '1') return 'enabled';
        },
        addApiKey: async function() {
            this.showErrorAlert = false;
            this.showSuccessAlert = false;

            try {
                await this.$store.dispatch("addApiKey");
                this.success = 'New API key generated successfully.';
                this.showSuccessAlert = true;
            }
            catch(e) {
                this.error = e.message;
                this.showErrorAlert = true;
            }
        },
        onCopy: function() {
            this.snackbar = true;
        },
        filter: function() {
            let tempItemArray = [];
            let items = this.$store.getters.items;
            // filter by brand if set
            if (this.brandFilter) {
                tempItemArray = items.filter(i => i.brand == this.brandFilter)
            }
            else {
                tempItemArray = items;
            }

            // filter by name if set (index of)
            if (this.nameFilter) {
                let itemsTemp = tempItemArray.filter(i => {
                    return i.name.toLowerCase().indexOf(this.nameFilter.toLowerCase()) > -1;
                })

                if (itemsTemp.length > 0) {
                    tempItemArray = itemsTemp;
                }
            }

            this.sortedItems = tempItemArray;
        },
        validate: async function() {
            if (this.valid) {
                await this.addItem();
            }
        },
        addItem: async function() {
            console.log('fired')
            const item = {
                name: this.itemName,
                brand: this.itemBrand
            };

            try {
                await this.$store.dispatch("addItem", item);
                this.success = 'Item registered successfully.'
                this.showSuccessAlert = true;

                this.itemBrand = '';
                this.itemName = '';
            }
            catch (e) {
                this.error = e.message;
                this.showErrorAlert;
            }
        }
    },
    computed: {
        apiKeys() {
            return this.$store.getters.apiKeys;
        },
        items() {
            return this.$store.getters.items;
        },
        brands() {
            let items = this.$store.getters.items;
            let brandArray = [];

            if (items.length > 0) {
                items.forEach(i => {
                    if (!brandArray.includes(i.brand)) {
                        brandArray.push(i.brand);
                    }
                });
            }

            return brandArray;
        }
    },
    mounted() {
        this.$store.dispatch("getApiKeys");
        this.$store.dispatch("getItems");
    }
}
</script>

<style lang="scss" scoped>
.developer {
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
            margin-top: 1.4rem;
            margin-bottom: 1.4rem;
            margin-left: 1.4rem;
        }

        h5 {
            font-size: 1.2rem;
            margin-top: 1.4rem;
            margin-bottom: 0.5rem;
            margin-left: 1.4rem;
        }

        p {
            font-size: 1.2rem;
            color: #5E3838;
            margin-bottom: 1rem;

            span {
                color: #38BD3D;
            }
        }
    }

    .v-card {
        margin-top: 2rem;
        width: 100%;
        max-width: 1500px;
    }

    
    .keys .v-table {
        td {
            font-size: 1.1rem;
            padding: 0.5rem;
        }

        th {
            font-size: 1.1rem;
        }

        button.toggle {
            padding-right: 1.5rem;
            padding-left: 1.5rem;
            padding-top: 0.5rem;
            padding-bottom: 0.5rem;
            color: white;
            border-radius: 4px;

            &.enabled {
                background-color: #36ad78;

                &:hover {
                    background-color: #46cc90;
                }
            }

            &.disabled {
                background-color: #fc2c2c;

                &:hover {
                    background-color: #fa6a6a;
                }
            }
        }

        button.copy {
            padding: 0.5rem;
            border-radius: 5px;
            
            &:hover {
                background-color: white;
            }
        }
    }

    .item-register .v-table {
        td {
            font-size: 1.1rem;
            padding: 0.5rem;
            padding-left: 1rem;
        }

        th {
            font-size: 1.1rem;
        }
    }
}

button.gen {
    padding-right: 1.5rem;
    padding-left: 1.5rem;
    padding-top: 0.7rem;
    padding-bottom: 0.7rem;
    color: white;
    border-radius: 4px;
    background-color: #61AFFE;
    margin-top: 2rem;
    font-size: 1.1rem;

    &:hover {
        background-color: #48a3ff;
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

.developer .v-container p.not-found {
    margin: 2rem;
}

.filter {
    padding: 1rem;

    .v-input {
        margin-bottom: -2rem;
    }
}

.add {
    padding: 1rem;

    .v-input {
        margin-bottom: -1rem;
    }
    
    button {
        background-color: #36ad78;
        color: white;
        height: 70%;
        border-radius: 5px;
    }
}
</style>