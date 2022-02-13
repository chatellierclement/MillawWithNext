// Next.js API route support: https://nextjs.org/docs/api-routes/introduction
import prisma from "../../prisma/lib/prisma";

export default async function api(req, res) {
  switch (req.method) {
    case "GET":
      let apiFind = null;
      if (req.query.bar_id) {
        apiFind = await prisma.api.findFirst({
          where: {
            bar_id: +req.query.bar_id,
          },
        });
      }
      res.status(200).json(apiFind);
      break;
    case "POST":
      let apiCreate = await prisma.api.create({
        data: req.body,
      });
      res.status(200).json(apiCreate);
      break;
    case "PUT":
      let apiPatch = await prisma.api.update({
        where: {
          id: req.body.id,
        },
        data: req.body,
      });
      res.status(200).json(apiPatch);
      break;
    case "DELETE":
      let apiDelete = await prisma.api.delete({
        where: {
          id: req.body.id,
        },
      });
      res.status(200).json(apiDelete);
      break;
  }
}
