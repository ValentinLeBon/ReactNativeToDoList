import firebase from 'firebase';
import '@firebase/firestore';

const firebaseConfig = {
    apiKey: "AIzaSyCnIBp0ZGXG4dJSZUgH6XnwPp5mx67lb6o",
    authDomain: "reactnativetodolist-ddb2d.firebaseapp.com",
    projectId: "reactnativetodolist-ddb2d",
    storageBucket: "reactnativetodolist-ddb2d.appspot.com",
    messagingSenderId: "742330701840",
    appId: "1:742330701840:web:2a073e9af02c10c13ed295"
};

/* Installation et configuration */
export default class Fire {
    constructor(callback) {
        this.init(callback);
    }

    init(callback) {
        if(!firebase.apps.length) {
            firebase.initializeApp(firebaseConfig);
        }

        firebase.auth().onAuthStateChanged(user => {
            if (user) {
                callback(null);
            } else {
                firebase.auth().signInAnonymously().catch(error => {
                    callback(error);
                });
            }
        })
    }

    /* Récupération des données */
    get ref() {
        return firebase.firestore().collection("lists");
    }

    getLists(callback) {
        let ref = this.ref.orderBy("name");
        this.unsubscribe = ref.onSnapshot(snapshot => {
            let lists = [];
            snapshot.forEach(doc => {
                lists.push({ id: doc.id, ...doc.data() });
                });
                callback(lists);
            }, function(error) {
                console.error(error);
            });
        }

    /* CRUD */
    addList(list) {
        let ref = this.ref;
        ref.add(list);
    }

    deleteList(list) {
        let ref = this.ref;
        ref.doc(list.id).delete();
    }

    updateList(list) {
        let ref = this.ref;
        ref.doc(list.id).update(list);
    }

    detach() {
        this.unsubscribe();
    }


};

