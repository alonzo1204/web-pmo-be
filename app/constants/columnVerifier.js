const setQuery = (word, code, value) => {
    let query = "";
    switch (word) {
        case "name":
            query = typeof (value) === 'string' ? `
            UPDATE project 
            SET 
                name = '${value}'
            WHERE
                project.code = '${code}';` : '';
            break;
        case "description":
            typeof (value) === 'string' ?
                query = `
            UPDATE project 
            SET 
                description = '${value}'
            WHERE
                project.code = '${code}';` : '';
            break;
        case "general_objective":
            query = typeof (value) === 'string' ? `
            UPDATE project 
            SET 
                general_objective = '${value}'
            WHERE
                project.code = '${code}';` : '';
            break;
        case "specific_objective_1":
            query = typeof (value) === 'string' ? `
            UPDATE project 
            SET 
                specific_objective_1 = '${value}'
            WHERE
                project.code = '${code}';` : '';
            break;
        case "specific_objective_2":
            query = typeof (value) === 'string' ? `
            UPDATE project 
            SET 
                specific_objective_2 = '${value}'
            WHERE
                project.code = '${code}';` : ''
            break;
        case "specific_objective_3":
            query = typeof (value) === 'string' ? `
            UPDATE project 
            SET 
                specific_objective_3 = '${value}'
            WHERE
                project.code = '${code}';` : '';
            break;
        case "specific_objective_4":
            query = typeof (value) === 'string' ? `
            UPDATE project 
            SET 
                specific_objective_4 = '${value}'
            WHERE
                project.code = '${code}';` : '';
            break;
        case "url_file":
            query = typeof (value) === 'string' ? `
            UPDATE project 
            SET 
                url_file = '${value}'
            WHERE
                project.code = '${code}';` : '';
            break;
        case "url_sharepoint":
            query = typeof (value) === 'string' ? `
            UPDATE project 
            SET 
                url_sharepoint = '${value}'
            WHERE
                project.code = '${code}';` : '';
            break;
        case "product_owner_code":
            query = typeof (value) === 'number' ? `
            UPDATE project 
            SET 
                product_owner_code = '${value}'
            WHERE
                project.code = '${code}';` : ''
            break;
        case "portfolio_manage_code":
            query = typeof (value) === 'number' ? `
            UPDATE project 
            SET 
                portfolio_manage_code = '${value}'
            WHERE
                project.code = '${code}';` : ''
            break;
        case "co_autor_code":
            query = typeof (value) === 'number' ? `
            UPDATE project 
            SET 
                co_autor_code = '${value}'
            WHERE
                project.code = '${code}';` : ''
            break;
        case "group_code":
            query = typeof (value) === 'number' ? `
            UPDATE project 
            SET 
                group_code = '${value}'
            WHERE
                project.code = '${code}';` : ''
            break;
        case "portfolio_code":
            query = typeof (value) === 'number' ? `
            UPDATE project 
            SET 
                portfolio_code = '${value}'
            WHERE
                project.code = '${code}';` : ''
            break;
        case "semester_code":
            query = typeof (value) === 'number' ? `
            UPDATE project 
            SET 
                semester_code = '${value}'
            WHERE
                project.code = '${code}';` : ''
            break;
        default:
            query = "error"
            break;
    }
    return query;

}
module.exports = {
    setQuery
}