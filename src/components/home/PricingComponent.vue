<template>
    <v-container class="pricing">
        <v-row align="center" justify="center">
            <p>PRICING OF ELECTROREVIEWAPI</p>
        </v-row>
        <v-row align="center" justify="center">
            <h1 id="pricing">Unbelievable Pricing</h1>
        </v-row>
        <v-row align="center" justify="center"> 
            <table>
                <tr>
                    <th></th>
                    <th>free</th>
                    <th>premium</th>
                </tr>
                <tr>
                    <td>monthly</td>
                    <td>-</td>
                    <td>£15</td>
                </tr>
                <tr>
                    <td>annual</td>
                    <td>-</td>
                    <td>£150</td>
                </tr>
                <tr>
                    <td>review storage</td>
                    <td>&check;</td>
                    <td>&check;</td>
                </tr>
                <tr>
                    <td>RESTful API</td>
                    <td>&check;</td>
                    <td>&check;</td>
                </tr>
                <tr>
                    <td>business intelligence</td>
                    <td>-</td>
                    <td>&check;</td>
                </tr>
            </table>
        </v-row>
    </v-container>
</template>

<script>
export default {
    name: 'PricingComponent'
}
</script>

<style lang="scss" scoped>
.pricing {
    margin-bottom: 20rem;
    font-family: 'Roboto Condensed', sans-serif;
    margin-top: 4rem;

    p {
        font-size: 0.9rem;
        color: #A1A1A1;
    }

    h1 {
        font-size: 1.7rem;
        margin-top: 1rem;
        font-weight: 500;
    }

    table {
        font-size: 1.1rem;
        min-width: 400px;
        width: 40%;
        border-collapse: collapse;
        margin-top: 3.5rem;

        td, th {
            border: 1px solid #C6C6C6;
            text-align: center;
            padding: 5px;
            min-width: 120px;
        }

        tr:first-child th {
            border-top: 0;
        }

        tr:last-child td {
            border-bottom: 0;
        }

        tr td:first-child, tr th:first-child {
            border-left: 0;
            text-align: right;
            padding-right: 1rem;
        }

        tr td:last-child, tr th:last-child {
            border-right: 0;
        }
    }
}
</style>