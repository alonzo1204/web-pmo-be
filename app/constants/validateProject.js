const validProject = (project) => {
    if (typeof (project.name) === 'string' && typeof (project.description) === 'string' && typeof (project.general_objective) === 'string' &&
        typeof (project.specific_objetive_1) === 'string' && typeof (project.specific_objetive_2) === 'string' &&
        typeof (project.specific_objetive_3) === 'string' && typeof (project.specific_objetive_4) === 'string' &&
        typeof (project.url_file) === 'string' && typeof (project.url_sharepoint) === 'string' && typeof (project.comments) === 'string' &&
        typeof (project.paper) === 'number' && typeof (project.devices) === 'number' && typeof (project.career_id) === 'number' &&
        typeof (project.product_owner_id) === 'number' && typeof (project.portfolio_manager_id) === 'number' &&
        typeof (project.co_autor_id) === 'number' && typeof (project.project_process_state_id) === 'number' &&
        typeof (project.company_id) === 'number' && typeof (project.portfolio_id) === 'number' &&
        typeof (project.semester_id) === 'number' && typeof (project.group_id) === 'number') {
        return true
    }
    return false
}
module.exports = {
    validProject
}