// Next.js API route support: https://nextjs.org/docs/api-routes/introduction
import prisma from "../../prisma/lib/prisma";

export default async function planning(req, res) {
  switch (req.method) {
    case "GET":
      let planningFind = null;
      if (req.query.id) {
        planningFind = await prisma.planning.findFirst({
          where: { id: +req.query.id },
        });
      } else if (req.query.month && req.query.year) {
        planningFind = await prisma.planning.findMany({
          where: {
            AND: [{ month: +req.query.month }, { year: +req.query.year }],
          },
        });
      }else if (req.query.month && req.query.year && req.query.permanenceId) {
        planningFind = await prisma.planning.findMany({
          where: {
            AND: [{ month: +req.query.month }, { year: +req.query.year }, {permanenceId: +req.query.permanenceId}],
          },
        });
      }  
      
      else {
        planningFind = await prisma.planning.findMany();
      }
      res.status(200).json(planningFind);
      break;
    case "POST":
      let planningCreate = await prisma.planning.create({
        data: req.body,
      });
      res.status(200).json(planningCreate);
      break;
    case "PUT":
      let planningPatch = await prisma.planning.update({
        where: {
          id: req.body.id,
        },
        data: req.body,
      });
      res.status(200).json(planningPatch);
      break;
    case "DELETE":
      let planningDelete = await prisma.planning.delete({
        where: {
          id: +req.body.idplanning,
        },
      });
      res.status(200).json(planningDelete);
      break;
  }
}
