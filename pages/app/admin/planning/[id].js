import React, { Component, useState, useEffect } from "react";
import { useRouter } from "next/router";

export default function Planning() {
    const router = useRouter();
    const { id } = router.query;

    return (
        <>
        planning id : {id}
        </>
    )
}