<template>
  <div id="app">
    <section v-if="!decided">
      <div>
        <h1>People:</h1>
        <ul>
          <li v-for="user in users" :key="user.id">{{ user.name }}</li>
        </ul>
      </div>
      <div>
        <h1>Works:</h1>
        <ul>
          <li v-for="work in works" :key="work.id">{{ work.name }}</li>
        </ul>
      </div>
    </section>
    <section v-else>
      <h1>{{ new Date().toJSON().slice(0,10).replace(/-/g,'/') }} Fate:</h1>
      <ul>
        <li v-for="(value, name) in decision" :key="name">
          <h3>
            {{ name }}
            <font-awesome-icon :icon="['fas', 'trophy']" v-if="value.length == 1" />
            <font-awesome-icon :icon="['fas', 'heart-broken']" v-else />
          </h3>

          <div v-for="decision in value" :key="decision.work">{{ decision.work }}</div>
        </li>
      </ul>
    </section>

    <button @click="makeDecision()" v-if="!decided">Decide</button>
  </div>
</template>

<script>
import _ from "lodash";

import { db } from '@/firebase';

export default {
  name: "App",
  data: function() {
    return {
      works: [],
      users: [],
      decided: false,
      decision: []
    };
  },
  firestore: {
    users: db.collection('users'),
    works: db.collection('works') 
  },
  methods: {
    suffle: function(array) {
      let m = array.length,
        t,
        i;

      // While there remain elements to shuffle…
      while (m) {
        // Pick a remaining element…
        i = Math.floor(Math.random() * m--);

        // And swap it with the current element.
        t = array[m];
        array[m] = array[i];
        array[i] = t;
      }

      return array;
    },
    makeDecision: function() {
      let decision = [];

      let works = this.suffle(this.works);
      let users = this.suffle(this.users);
      let leftWorks = [];

      works.forEach(function(work, i) {
        if (users[i]) {
          decision.push({
            work: work.name,
            users: users[i].name
          });
        } else {
          leftWorks.push(work);
        }
      });

      let anotherSuffleUsers = this.suffle(this.users);

      leftWorks.forEach(function(work, i) {
        decision.push({
          work: work.name,
          users: anotherSuffleUsers[i].name
        });
      });

      this.decision = _.groupBy(decision, "users");
      this.decided = true;
    }
  }
};
</script>

<style>
#app {
  font-family: Avenir, Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
  margin-top: 60px;
}

ul {
  list-style: none;
}
</style>
