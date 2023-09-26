const getState = ({ getStore, getActions, setStore }) => {
  return {
    store: {
      message: null,
      demo: [
        {
          title: "FIRST",
          background: "white",
          initial: "white",
        },
        {
          title: "SECOND",
          background: "white",
          initial: "white",
        },
      ],
      loginConfirmation: false,
      user: null,
    },
    actions: {
      // Use getActions to call a function within a fuction
      excludeRoutes: (arr) => {
        return arr.filter((route) => { return route == window.location.pathname })

      },

      getMessage: async () => {
        try {
          // fetching data from the backend
          const resp = await fetch(process.env.BACKEND_URL + "/api/hello");
          const data = await resp.json();
          setStore({ message: data.message });
          // don't forget to return something, that is how the async resolves
          return data;
        } catch (error) {
          console.log("Error loading message from backend", error);
        }
      },

      changeColor: (index, color) => {
        //get the store
        const store = getStore();

        //we have to loop the entire demo array to look for the respective index
        //and change its color
        const demo = store.demo.map((elm, i) => {
          if (i === index) elm.background = color;
          return elm;
        });

        //reset the global store
        setStore({ demo: demo });
      },

      fetchGenerico: async (path, metodo = "GET", data = null) => {
        let obj = {
          method: metodo,
          headers: {
          },
          body: JSON.stringify(data),
        };
        if (metodo == "GET") {
          obj = {
            method: metodo,
            headers: {
              // "Content-Type": "application/json",
              // Authorization: "Bearer " + localStorage.getItem("token"),
            },
          };
        }
        let response = await fetch(path, obj);
        return response;
      },

      fetchPromise: async (path, metodo = "GET", data = null) => {
        const BASE_URL = process.env.BACKEND_URL;
        let url = BASE_URL + path;
        let obj = {
          method: metodo,
          headers: {
            "Content-Type": "application/json",
            Authorization: "Bearer " + localStorage.getItem("token"),
          },
          body: JSON.stringify(data),
        };
        if (metodo == "GET") {
          obj = {
            method: metodo,
            headers: {
              "Content-Type": "application/json",
              Authorization: "Bearer " + localStorage.getItem("token"),
            },
          };
        }
        let response = await fetch(url, obj);
        return response;
      },

      activateLoginConfirmation: (userInfo) => {
        const store = getStore();
        const actions = getActions();
        setStore({ ...store, loginConfirmation: true });
        setStore({ ...store, user: userInfo });
      },

      deactivateLoginConfirmation: () => {
        const store = getStore();
        const actions = getActions();
        setStore({ ...store, loginConfirmation: false });
      },

      auth: async () => {
        const store = getStore();
        const actions = getActions();
        let response = await actions.fetchPromise("/api/auth", "GET");
        if (response.ok) {
          let responseJson = await response.json();
          console.log(responseJson)
          setStore({ ...store, user: responseJson });
        } else {
          let responseJson = await response.json();
          console.log(responseJson)
        }

      },
      logout: async () => {
        const store = getStore();
        const actions = getActions();
        let response = await actions.fetchPromise("/api/logout", "POST");
        if (response.ok) {
          let responseJson = await response.json();
          console.log(responseJson)
          setStore({ ...store, user: null });
          actions.deactivateLoginConfirmation()
        } else {
          let responseJson = await response.json();
          console.log(responseJson)
        }

      }
    },

  };
};

export default getState;
