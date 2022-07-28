const openAlbumModel = ({
    id,
    name,
    year
}) => ({
    id,
    name,
    year
});

const openMusicModel = ({
    id,
    title,
    year,
    performer,
    genre,
    duration,
    inserted_at,
    updated_at,
}) => ({
    id,
    title,
    year,
    performer,
    genre,
    duration,
    insertedAt: inserted_at,
    updatedAt: updated_at,
})

module.exports = { openAlbumModel, openMusicModel };