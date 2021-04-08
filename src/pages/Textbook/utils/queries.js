export const updateWord = (api, id, mode) => {
    console.log('mode', mode);
    console.log('id', id);
    let done = false;
    let message = '';
    let error = null;

    const data = {
        difficulty: "weak",
        optional: { 
            isDeleted: false,
            isStudied: false, 
        }
    }
    let successMessage = 'Слово успешно восстановлено';
    if (mode === 'u') {
        data.difficulty = 'high';
        data.optional.isStudied = true;
        successMessage = 'Слово отмечено, как Сложное';

    } else if (mode === 'd') {
        data.optional.isDeleted = true;
        successMessage = 'Слово успешно удалено';
    }
    api.getUserWord(id)
        .then(() => api.putUserWord(id, data))
        .catch((e) =>
            e.status === 404
                ? api.postWord(id, data)
                : error = 'Что-то пошло не так... Попробуйте снова'
        );
        if(!error) {
            done = true;
            message = successMessage;
        }

    return { done, mode, message, error };
}
