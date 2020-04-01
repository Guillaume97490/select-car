const request = require("request");

/**
 * The index controller
 *
 * @controller indexController
 */
class indexController {
  /**
   * The home page, get All car brand
   * @function 
   * @param {object} req Express request object
   * @param {object} res Express response object
   * @memberof indexController
   */
  home = async (req, res) => {
    const url = "https://www.carqueryapi.com/api/0.3/?cmd=getMakes";
    let list = await this.doRequest(url);

    let brands = [];
    list.Makes.forEach(element => {
      brands = [...brands, element.make_display];
    });

    res.render("index", {
      title: "Express",
      brands: brands
    });
  };

  /**
   * Get model for a car brand
   * @function 
   * @param {object} req Express request object
   * @param {string} req.params.brand brand
   * @param {object} res Express response object
   * @memberof indexController
   * @return {object} The car models of a brand
   */
  getModels = async (req, res) => {
    const brand = req.params.brand.toLowerCase();
    const url = `https://www.carqueryapi.com/api/0.3/?cmd=getModels&make=${brand}`;
    let list = await this.doRequest(url);

    let models = [];
    list.Models.forEach(element => {
      models = [...models, element.model_name];
    });

    res.send(models);
  };

  /**
   * Get specs for a car model
   * @function 
   * @param {object} req Express request object
   * @param {string} req.params.model model
   * @param {string} req.params.brand brand
   * @param {object} res Express response object
   * @memberof indexController
   * @return {object} The specs datas object of car
   * @todo select the sub-model for each models
   */
  getSpecs = async (req, res) => {
    const model = req.params.model;
    const brand = req.params.brand;
    const url = `https://www.carqueryapi.com/api/0.3/?cmd=getTrims&make=${brand}&model=${model}`;
    let list = await this.doRequest(url);

    console.log(list.Trims[0]);

    let specs = list.Trims[0];

    let result = {};
    for (const key in specs) {
      if (specs[key]) {
        result[key] = specs[key];
      }
    }
    res.send(result);
  };


  /**
   * the request function
   * @function 
   * @param {string} url
   * @returns json of result request
   * @memberof indexController
   */
  doRequest(url) {
    return new Promise(function(resolve, reject) {
      request(url, { json: true }, function(error, res, body) {
        if (!error && res.statusCode == 200) {
          resolve(body);
        } else {
          reject(error);
        }
      });
    });
  }
}
module.exports = new indexController();