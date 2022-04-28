const setQuery = (word, code, value) => {
    let query = "";
    switch (word) {
        case "name":
            query = typeof (value) === 'string' ? `
            UPDATE project 
            SET 
                name = '${value}',
                update_date = CURRENT_TIMESTAMP
            WHERE
                project.code = '${code}';` : '';
            break;
        case "description":
            typeof (value) === 'string' ?
                query = `
            UPDATE project 
            SET 
                description = '${value}',
                update_date = CURRENT_TIMESTAMP
            WHERE
                project.code = '${code}';` : '';
            break;
        case "general_objective":
            query = typeof (value) === 'string' ? `
            UPDATE project 
            SET 
                general_objective = '${value}',
                update_date = CURRENT_TIMESTAMP
            WHERE
                project.code = '${code}';` : '';
            break;
        case "specific_objective_1":
            query = typeof (value) === 'string' ? `
            UPDATE project 
            SET 
                specific_objective_1 = '${value}',
                update_date = CURRENT_TIMESTAMP
            WHERE
                project.code = '${code}';` : '';
            break;
        case "specific_objective_2":
            query = typeof (value) === 'string' ? `
            UPDATE project 
            SET 
                specific_objective_2 = '${value}',
                update_date = CURRENT_TIMESTAMP
            WHERE
                project.code = '${code}';` : ''
            break;
        case "specific_objective_3":
            query = typeof (value) === 'string' ? `
            UPDATE project 
            SET 
                specific_objective_3 = '${value}',
                update_date = CURRENT_TIMESTAMP
            WHERE
                project.code = '${code}';` : '';
            break;
        case "specific_objective_4":
            query = typeof (value) === 'string' ? `
            UPDATE project 
            SET 
                specific_objective_4 = '${value}',
                update_date = CURRENT_TIMESTAMP
            WHERE
                project.code = '${code}';` : '';
            break;
        case "url_file":
            query = typeof (value) === 'string' ? `
            UPDATE project 
            SET 
                url_file = '${value}',
                update_date = CURRENT_TIMESTAMP
            WHERE
                project.code = '${code}';` : '';
            break;
        case "url_sharepoint":
            query = typeof (value) === 'string' ? `
            UPDATE project 
            SET 
                url_sharepoint = '${value}',
                update_date = CURRENT_TIMESTAMP
            WHERE
                project.code = '${code}';` : '';
            break;
        case "product_owner_id":
            query = typeof (value) === 'number' ? `
            UPDATE project 
            SET 
                product_owner_id = '${value}',
                update_date = CURRENT_TIMESTAMP
            WHERE
                project.code = '${code}';` : ''
            break;
        case "portfolio_manager_id":
            query = typeof (value) === 'number' ? `
            UPDATE project 
            SET 
                portfolio_manager_id = '${value}',
                update_date = CURRENT_TIMESTAMP
            WHERE
                project.code = '${code}';` : ''
            break;
        case "co_autor_id":
            query = typeof (value) === 'number' ? `
            UPDATE project 
            SET 
                co_autor_id = '${value}',
                update_date = CURRENT_TIMESTAMP
            WHERE
                project.code = '${code}';` : ''
            break;
        case "group_id":
            query = typeof (value) === 'number' ? `
            UPDATE project 
            SET 
                group_id = '${value}',
                update_date = CURRENT_TIMESTAMP
            WHERE
                project.code = '${code}';` : ''
            break;
        case "portfolio_id":
            query = typeof (value) === 'number' ? `
            UPDATE project 
            SET 
                portfolio_id = '${value}',
                update_date = CURRENT_TIMESTAMP
            WHERE
                project.code = '${code}';` : ''
            break;
        case "portfolio_id":
            query = typeof (value) === 'number' ? `
            UPDATE project 
            SET 
                portfolio_id = '${value}',
                update_date = CURRENT_TIMESTAMP
            WHERE
                project.code = '${code}';` : ''
            break;
        default:
            query = ""
            break;
    }
    return query;

}
module.exports = {
    setQuery
}