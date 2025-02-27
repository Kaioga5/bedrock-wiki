---
title: Block Culling
description: Block culling rules benefit performance, allowing you to remove faces of a blocks model based on the surrounding full, opaque blocks.
category: General
tags:
    - intermediate
license: true
mentions:
    - legopitstop
    - QuazChick
---

:::tip CREATE YOUR MODEL
Before you start, make sure you've [created a model](/blocks/block-models) for your block. Otherwise you'll have nothing to apply culling rules to!
:::

## Applying Culling Rules

Block culling rules allow you to remove faces of a block's model based on the surrounding full, opaque blocks. This can help to improve the game's performance as resources aren't wasted on unnecessarily rendering hidden parts of your block.

Culling rules are added in your resource pack's "block_culling" folder and appear in the format shown below:

<CodeHeader>RP/block_culling/lamp.json</CodeHeader>

```json
{
    "format_version": "1.21.60",
    "minecraft:block_culling_rules": {
        "description": {
            "identifier": "wiki:culling.lamp" // Identifier to be referenced in block JSON geometry component.
        },
        "rules": [ ... ] // An array that can contain multiple culling rules.
    }
}
```

They are then applied to block models in your block's [`minecraft:geometry`](/blocks/block-components#geometry) component:

<CodeHeader>minecraft:block > components</CodeHeader>

```json
"minecraft:geometry": {
    "identifier": "geometry.lamp", // Model identifier
    "culling": "wiki:culling.lamp" // Block culling rules identifier
}
```

## Culling Entire Bones

This type of rule should be used if a bone is only visible from one direction, meaning the entire bone can be culled rather than individual cube faces.

<CodeHeader>minecraft:block_culling_rules > rules</CodeHeader>

```json
{
    "direction": "up", // This bone will be culled if there is a full, opaque block above the lamp.
    "geometry_part": {
        "bone": "lamp_bulb" // Name of the bone to be culled.
    }
}
```

## Culling Cube Faces

This type of rule should be used when you want to hide specific faces of cubes that are abutting full, opaque blocks.

<CodeHeader>minecraft:block_culling_rules > rules</CodeHeader>

```json
{
    "direction": "down", // This bone will be culled if there is a full, opaque block below the lamp.
    "geometry_part": {
        "bone": "lamp_base", // Name of the bone containing the cube to be culled.
        "cube": 0, // The zero-based index of the cube in the bone's "cubes" array.
        "face": "down" // The face of the cube to cull. This is usually the same as the rule's "direction" unless your cube is rotated.
    }
}
```
