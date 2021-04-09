export const updateWord = (api, id, mode) => {
    let done = false;
    let message = '';
    let error = null;

    const data = {
        difficulty: "weak",
        optional: { 
            isDeleted: false,
            isStudied: true, 
        }
    }
    let successMessage = 'Слово успешно восстановлено';
    if (mode === 'u') {
        data.difficulty = 'high';
        data.optional.isStudied = true;
        successMessage = 'Слово отмечено, как Сложное';

    } else if (mode === 'd') {
        data.optional.isDeleted = true;
        data.optional.isStudied = false;
        successMessage = 'Слово успешно удалено';
    } 
    api.getUserWord(id)
        .then(() => {
            api.putUserWord(id, data)
        })
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
