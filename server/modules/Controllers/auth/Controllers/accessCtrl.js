var appRoot ='/home/nms-backend/actions-runner/_work/nms_node/nms_node';
var authMdl = require('../Models/authMdl');
var df = require( '../../../../../utils/dflower.utils');
var cntxtDtls = df.getModuleMetaData(__dirname, __filename);
var jwt=require('jsonwebtoken')



exports.hasToken = (req, res, next) => {
    let token = req.headers['x-access-token'];
    console.log(token,'tokennnnnnnnnnnnnnnnnnnnnn');
            if (!token) {
                return res.status(258).send({ auth: false, message: 'No token provided.', data: [] });
            }

            let parts = token.split('.');

            if (parts.length !== 3) {
                return res.status(555).send({ auth: false, message: 'Invalid token: ' + JSON.stringify(token), data: [] });
            }

            else {
                
                var verified;
              
                try {
                    verified = jwt.verify(token, 'Networkmanagement', { algorithm: 'HS256'});
                }
                catch (err) {
                    verified = null;
                }
                console.log(verified)
                if (verified) {
                    req.user = user;
                    next();
                } else {
                    return res.status(555).send({ auth: false, message: 'Failed to authenticate token.', data: [] });
                }
            };
      
}

