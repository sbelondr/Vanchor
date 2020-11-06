<template>
<div class="bodyHome">
  <div class="grid-container">
    <!-- <header class="header"></header> -->
    <aside class="sidenav">
      <ul class="sidenav__list">
        <li class="sidenav__list-item" @click="clickNavItem(0)">Dashboard</li>
        <li class="sidenav__list-item" @click="clickNavItem(1)">Notes</li>
        <!-- <li class="sidenav__list-item" @click="clickNavItem(2)">Pomodoro</li> -->
        <li class="sidenav__list-item" @click="clickNavItem(2)">Timer</li>
        <li class="sidenav__list-item" @click="clickNavItem(3)">To Do</li>
        <li class="sidenav__list-item" @click="clickNavItem(4)">Vanchor</li>
        <li class="sidenav__list-item">Tâches (à faire)</li>
      </ul>
    </aside>
    <main class="main">
      <div class="home">
        <Dashboard v-if="navItem[0] == true" />
        <Note v-if="navItem[1] == true" />
        <Timer v-if="navItem[2] == true" />
        <Todo v-if="navItem[3] == true" />
        <Vanchor v-if="navItem[4] == true" />
      </div>
    </main>
    <footer class="footer">
      <div class="footer__copyright">&copy; 2020 sbelondr</div>
    </footer>
  </div>
  <div></div>
</div>
</template>

<script>
// import Vanchor from "./Vanchor";
import {
  // reactive,
  ref,
  onMounted,
} from "@vue/composition-api";

export default {
  name: "Home",
  components: {
    Dashboard: () => import("@/components/Dashboard"),
    Note: () => import("@/components/Note"),
    Timer: () => import("@/components/Timer"),
    Todo: () => import("@/components/Todo"),
    Vanchor: () => import("@/components/Vanchor"),
  },
  setup() {
    const navItem = ref([]);
    // const data = reactive({
    // navItem: [true, false, false, false, false, false],
    // });

    onMounted(() => {
      navItem.value = [false, true, false, false, false];
    });

    function clickNavItem(id) {
      const newItem = [];
      navItem.value.forEach((element, i) => {
        newItem.push(i == id ? true : false);
      });
      navItem.value = newItem;
      // console.table(navItem.value);
    }

    return {
      navItem,
      clickNavItem,
    };
  },
  methods: {},
};
</script>

<style lang="scss" scoped>
.bodyHome {
  overflow: hidden;
}

.header,
.footer {
  display: flex;
  align-items: center;
  justify-content: space-between;
  padding: 0 16px;
  background-color: #648ca6;
}

// sidenav
.sidenav {
  display: flex;
  /* Will be hidden on mobile */
  flex-direction: column;
  grid-area: sidenav;
  background-color: #3b4957; //#394263;
}

.sidenav__list {
  padding: 0;
  margin-top: 85px;
  list-style-type: none;
}

.sidenav__list-item {
  padding: 20px 20px 20px 40px;
  color: #ddd;
}

.sidenav__list-item:hover {
  background-color: rgba(255, 255, 255, 0.2);
  cursor: pointer;
}

// main
// home

.home {
  // margin: 0;
  // padding: 0;
  width: 100%;
  // height: 20vh;
  background-color: rgb(226, 226, 226);
  // background-color: #444f5f;
}

.grid-container {
  display: grid;
  grid-template-columns: 240px 1fr;
  grid-template-rows: 0px 1fr 50px;
  grid-template-areas:
    "sidenav header"
    "sidenav main"
    "sidenav footer";
  height: 100vh;
}

/* Give every child element its grid name */
.header {
  grid-area: header;
  background-color: #648ca6;
}

.sidenav {
  grid-area: sidenav;
  background-color: #3b4957; //#394263;
}

.main {
  grid-area: main;
  background-color: rgb(226, 226, 226);
  // background-color: white; //#3f4e5e; //#8fd4d9;
}

.footer {
  grid-area: footer;
  background-color: #3b4957; //648ca6;
  color: #ddd;
}
</style>
