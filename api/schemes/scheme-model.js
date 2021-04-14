const db = require('../../data/db-config')

function find() {
  return db("schemes as sc")
    .leftJoin("steps as st", "sc.scheme_id", "st.scheme_id")
    .select("sc.*")
    .count("st.step_id as number_of_steps")
    .groupBy("sc.scheme_id")
    .orderBy("sc.scheme_id", "asc")
}

function getSchemesById(id) {
  return db("schemes")
    .where("scheme_id", id)
    .first()
}

async function findById(scheme_id) {
  const scheme = await db("schemes as sc")
    .leftJoin("steps as st", "sc.scheme_id", "st.scheme_id")
    .select("sc.scheme_name", "st.*")
    .where("sc.scheme_id", scheme_id)
    .orderBy("st.step_number", "asc");

  const schemeObj = {};
  scheme.forEach(step => {
    if (!schemeObj.scheme_id && !schemeObj.scheme_name) {
      schemeObj.scheme_id = step.scheme_id;
      schemeObj.scheme_name = step.scheme_name;
      schemeObj.steps = [];
    }
    if (step.step_id) {
      schemeObj.steps.push({"step_id": step.step_id, "step_number": step.step_number, "instructions": step.instructions})
    }
  })

  return schemeObj;
}

async function findSteps(scheme_id) {
  const steps = await db("schemes as sc")
    .join("steps as st", "sc.scheme_id", "st.scheme_id")
    .select("st.step_id", "st.step_number", "st.instructions", "sc.scheme_name")
    .where("sc.scheme_id", scheme_id)
    .orderBy("st.step_number", "asc")
  
  return steps;
}

async function add(scheme) { 
  const [id] = await db("schemes").insert(scheme)
  return getSchemesById(id)
}

async function addStep(scheme_id, step) {
  await db("steps").insert({...step, scheme_id})
  return findSteps(scheme_id)
}

module.exports = {
  find,
  getSchemesById,
  findById,
  findSteps,
  add,
  addStep,
}
