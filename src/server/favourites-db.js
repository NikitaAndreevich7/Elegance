import { View, Text, Alert } from 'react-native'
import Realm from 'realm';

let realm;

class FavouritesDb {

    createDB = () => {
        realm = new Realm({
            path: 'favourites.realm',
            schema: [
                {
                    name: 'favourites_details',
                    properties: {
                        id: { type: 'int', default: 0 },
                        name: 'string',
                        gender: 'string',
                        description: 'string',
                        price: 'int',
                        palette: 'string',
                        images: 'string',
                    },
                },
            ],
        });
    }

    list = (successCallback) => {
        realm = new Realm({ path: 'favourites.realm' });
        let favourites_list = realm.objects('favourites_details');
        successCallback(favourites_list);
    }

    read = (id,successCallback) =>{
        realm = new Realm({ path: 'favourites.realm' });
        console.log('db path :', realm.path)
        realm.write(() => {
            let searchElement = realm.objects('favourites_details').filtered('id =' + id)
            console.log('searchElment  ',searchElement)
            successCallback(searchElement)
        });
    }

    update = ({ id, name, gender, description, price, palette, images }) => {
        realm = new Realm({ path: 'favourites.realm' });

        realm.write(() => {
            let element = realm.objects('favourites_details').filtered('id =' + id).length > 0 ? 1 : 0

            if (element) {
                realm.delete(
                    realm.objects('favourites_details').filtered('id =' + id)
                )
            } else if (!element) {
                realm.create('favourites_details', {
                    id: parseInt(id),
                    name,
                    gender,
                    description,
                    price,
                    palette: JSON.stringify(palette),
                    images: JSON.stringify(images)
                });
            }


        });
    }

    delet = (id) => {
        realm = new Realm({ path: 'favourites.realm' });
        console.log('++++++++++++++++++++++++++++++++=', realm.objects('favourites_details').filtered('id = ' + id)[0])
        realm.write(() => {
            realm.delete(realm.objects('favourites_details').filtered('id = ' + id)[0]);
        })

    }

}

let FavouritesDatabase = new FavouritesDb()

export default FavouritesDatabase