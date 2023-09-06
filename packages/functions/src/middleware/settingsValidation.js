import {object, string, number, boolean} from 'yup';

const settingsValidation = async (ctx, next) => {
  try {
    const data = ctx.req.body;
    let schema = object({
      position: string(),
      hideTimeAgo: boolean(),
      truncateProductName: boolean(),
      displayDuration: number().positive(),
      firstDelay: number().positive(),
      popsInterval: number().positive(),
      maxPopsDisplay: number().positive(),
      includedUrls: string(),
      excludedUrls: string(),
      allowShow: string()
    });
    await schema.validate(data);
    await next();
  } catch (error) {
    // console.log(error);
    ctx.status = 400;
    ctx.body = {
      success: false,
      errors: error.message
    };
  }
};

export default settingsValidation;
