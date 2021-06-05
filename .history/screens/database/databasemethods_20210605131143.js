import db from "../../config/firebase";

export const addSong = async (val, data) => {
  const { name, photo, id, track, subname } = data;

  await db
    .firestore()
    .collection("songs")
    .doc(val)
    .set(
      {
        songs: db.firestore.FieldValue.arrayUnion({
          name: name,
          photo: photo,
          id: id,
          track: track,
          subtitle: subname,
          playlist: val,
        }),
      },
      {
        merge: true,
      }
    );
};

export const postData = async (text, data) => {
  await db.firestore().collection("playlist").add({
    title: text,
    time: Date.now(),
  });=
  if (data != {}) {
    const { name, photo, id, track, subname } = data;
    await db
      .firestore()
      .collection("songs")
      .doc(text)
      .set(
        {
          songs: db.firestore.FieldValue.arrayUnion({
            name: name,
            photo: photo,
            id: id,
            track: track,
            subtitle: subname,
            playlist: text,
          }),
        },
        {
          merge: true,
        }
      );
  }
};
export const postData2 = async (text, data) => {
  await db.firestore().collection("playlist").add({
    title: text,
    time: Date.now(),
  })
    const { name, photo, id, track, subname } = data;
    await db
      .firestore()
      .collection("songs")
      .doc(text)
      .set(
        {
          songs: db.firestore.FieldValue.arrayUnion({
            name: name,
            photo: photo,
            id: id,
            track: track,
            subtitle: subname,
            playlist: text,
          }),
        },
        {
          merge: true,
        }
      );
  }
};
export const deleteplaylist = (id, val) => {
  db.firestore().collection("playlist").doc(id).delete();
  db.firestore().collection("songs").doc(val).delete();
};
export const getplaylist = async () => {
  return await db
    .firestore()
    .collection("playlist")
    .orderBy("time", "asc")
    .get();
};
export const getsongs = async (val) => {
  return await db.firestore().collection("songs").doc(val).get();
};
export const songremove = async (artists, n) => {
  await db
    .firestore()
    .collection("songs")
    .doc(n)
    .update({
      songs: db.firestore.FieldValue.arrayRemove({
        name: artists.name,
        photo: artists.photo,
        id: artists.id,
        track: artists.track,
        subtitle: artists.subtitle,
        playlist: n,
      }),
    });
};
