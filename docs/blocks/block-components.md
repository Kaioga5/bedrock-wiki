---
title: Block Components
description: Block components are used to change how your block appears and functions in the world.
category: General
nav_order: 2
mentions:
    - SirLich
    - solvedDev
    - yanasakana
    - SmokeyStack
    - MedicalJewel105
    - aexer0e
    - Chikorita-Lover
    - Lufurrius
    - TheDoctor15
    - XxPoggyisLitxX
    - TheItsNameless
    - ThomasOrs
    - Kaioga5
    - QuazChick
---

:::tip FORMAT & MIN ENGINE VERSION `1.21.60`
Using the latest format version when creating custom blocks provides access to fresh features and improvements. The wiki aims to share up-to-date information about custom blocks, and currently targets format version `1.21.60`.
:::
:::danger OVERRIDING COMPONENTS
Only one instance of each component can be active at once. Duplicate components will be overridden by the latest [permutations](/blocks/block-permutations) entry.
:::

## Applying Components

Block components are used to change how your block appears and functions in the world. They are applied in the `components` child of `minecraft:block` or a [permutation](/blocks/block-permutations).

<CodeHeader>BP/blocks/lamp.json</CodeHeader>

```json
{
    "format_version": "1.21.60",
    "minecraft:block": {
        "description": {
            "identifier": "wiki:lamp",
            "menu_category": {
                "category": "items"
            }
        },
        "components": {
            "minecraft:light_dampening": 0,
            "minecraft:light_emission": 15,
            "minecraft:map_color": [210, 200, 190],
            "minecraft:geometry": "geometry.lamp",
            "minecraft:material_instances": {
                "*": {
                    "texture": "wiki:lamp"
                },
                "shade": {
                    "texture": "wiki:lamp_shade"
                }
            }
        }
    }
}
```

## List of Components

### Collision Box

Defines the area of the block that collides with entities. If set to true, default values are used. If set to false, the block's collision with entities is disabled. If this component is omitted, default values are used.

_Released from experiment `Holiday Creator Features` for format versions 1.19.50 and higher._

Type: Boolean/Object

-   `origin`: Vector [a, b, c]
    -   Minimal position of the bounds of the collision box. `origin` is specified as `[x, y, z]` and must be in the range `(-8, 0, -8)` to `(8, 16, 8)`, inclusive.
-   `size`: Vector [a, b, c]
    -   Size of each side of the collision box. Size is specified as `[x, y, z]`. `origin` + `size` must be in the range `(-8, 0, -8)` to `(8, 16, 8)`, inclusive.

#### Example using Boolean

<CodeHeader>minecraft:block > components</CodeHeader>

```json
"minecraft:collision_box": true
```

#### Example using Object

<CodeHeader>minecraft:block > components</CodeHeader>

```json
"minecraft:collision_box": {
    "origin": [-8, 0, -8],
    "size": [16, 16, 16]
}
```

### Crafting Table

Makes your block into a custom crafting table which enables the crafting table UI and the ability to craft recipes.

_Released from experiment `Holiday Creator Features` for format versions 1.19.50 and higher._

Type: Object

-   `crafting_tags`: Array
    -   Required Field
    -   Defines the tags recipes should define to be crafted on this table. Limited to 64 tags. Each tag is limited to 64 characters.
-   `table_name`: String
    -   Specifies the language file key that maps to what text will be displayed in the UI of this table. If the string given can not be resolved as a loc string, the raw string given will be displayed. If this field is omitted, the name displayed will default to the name specified in the "display_name" component. If this block has no "display_name" component, the name displayed will default to the name of the block.

<CodeHeader>minecraft:block > components</CodeHeader>

```json
"minecraft:crafting_table": {
    "table_name": "Wiki Workbench",
    "crafting_tags": [
        "crafting_table",
        "wiki_workbench"
    ]
}
```

### Destructible by Explosion

Describes the destructible by explosion properties for this block. If set to true, the block will have the default explosion resistance. If set to false, this block is indestructible by explosion. If the component is omitted, the block will have the default explosion resistance.

Type: Boolean/Object

-   `explosion_resistance`: Double
    -   Describes how resistant the block is to explosion. Greater values mean the block is less likely to break when near an explosion (or has higher resistance to explosions). The scale will be different for different explosion power levels. A negative value or 0 means it will easily explode; larger numbers increase level of resistance.

#### Example using Boolean

<CodeHeader>minecraft:block > components</CodeHeader>

```json
"minecraft:destructible_by_explosion": false
```

#### Example using Object

<CodeHeader>minecraft:block > components</CodeHeader>

```json
"minecraft:destructible_by_explosion": {
    "explosion_resistance": 20
}
```

### Destructible by Mining

Describes the destructible by mining properties for this block. If set to true, the block will take the default number of seconds to destroy. If set to false, this block is indestructible by mining. If the component is omitted, the block will take the default number of seconds to destroy.

Type: Boolean/Object

-   `seconds_to_destroy`: Double
    -   Sets the number of seconds it takes to destroy the block with base equipment. Greater numbers result in greater mining times.
    -   Note: It actually takes 1.5&times; the amount of seconds defined.

#### Example using Boolean

<CodeHeader>minecraft:block > components</CodeHeader>

```json
"minecraft:destructible_by_mining": false
```

#### Example using Object

<CodeHeader>minecraft:block > components</CodeHeader>

```json
"minecraft:destructible_by_mining": {
    "seconds_to_destroy": 20
}
```

### Display Name

Specifies the language file key that maps to what text will be displayed when you hover over the block in your inventory and hotbar. If the string given can not be resolved as a loc string, the raw string given will be displayed. If this component is omitted, the name of the block will be used as the display name.

_Released from experiment `Holiday Creator Features` for format versions 1.19.60 and higher._

Type: String

#### Example using String

<CodeHeader>minecraft:block > components</CodeHeader>

```json
"minecraft:display_name": "Custom Block"
```

#### Example using Localization String

<CodeHeader>minecraft:block > components</CodeHeader>

```json
"minecraft:display_name": "tile.wiki:custom_block.name"
```

<CodeHeader>RP/texts/en_US.lang</CodeHeader>

```c
tile.wiki:custom_block.name=Custom Block
```

### Entity Fall On

Triggers an event when an entity falls onto this block.

Type: Object

-   `min_fall_distance`: Double
    -   The minimum distance an entity must fall to trigger the event in blocks.

_Released from experiment `Beta APIs` for format versions 1.21.10 and higher._

<CodeHeader>minecraft:block > components</CodeHeader>

```json
"minecraft:entity_fall_on": {
    "min_fall_distance": 5
}
```

### Flammable

Describes the flammable properties for this block. If set to true, default values are used. If set to false, or if this component is omitted, the block will not be able to catch on fire naturally from neighbors, but it can still be directly ignited.

Type: Boolean/Object

-   `catch_chance_modifier`: Int
    -   A modifier affecting the chance that this block will catch flame when next to a fire. Values are greater than or equal to 0, with a higher number meaning more likely to catch on fire. For a `catch_chance_modifier` greater than 0, the fire will continue to burn until the block is destroyed (or it will burn forever if the `destroy_chance_modifier` is 0). If the `catch_chance_modifier` is 0, and the block is directly ignited, the fire will eventually burn out without destroying the block (or it will have a chance to be destroyed if `destroy_chance_modifier` is greater than 0). The default value of 5 is the same as that of Planks.

#### Example using Boolean

<CodeHeader>minecraft:block > components</CodeHeader>

```json
"minecraft:flammable": true
```

#### Example using Object

<CodeHeader>minecraft:block > components</CodeHeader>

```json
"minecraft:flammable": {
    "catch_chance_modifier": 5,
    "destroy_chance_modifier": 20
}
```

### Friction

Describes the friction for this block in a range of (0.0-0.9). Friction affects an entity's movement speed when it travels on the block. Greater value results in more friction.

Type: Double

<CodeHeader>minecraft:block > components</CodeHeader>

```json
"minecraft:friction": 0.4
```

### Geometry

The description identifier of the geometry to use to render this block. This identifier must match an existing geometry identifier in any of the loaded resource packs or refer to one of the currently supported [vanilla models](/blocks/vanilla-block-models).

**Custom block model limitations:**

-   Your block is limited to 30&times;30&times;30 <abbr title="16ths of a block unit">pixels</abbr> in size.

-   At least 1 pixel of your block on each axis must be contained by the base 16&times;16&times;16 block.

-   The absolute bounds of the position of your 30&times;30&times;30 block are 30 <abbr title="16ths of a block unit">pixels</abbr> in each direction from the origin. Your block can be placed in any position within these bounds, as long as it adheres to rule #2.

Note: Does not conduct redstone. Even if using the vanilla `full_block` identifier. Makes your block breathable as well. Mobs are unable to spawn as well. Interestingly, bats are able to hang upside down on them despite being a "non solid" block in terms of spawnability and conducitvity.

_Released from experiment `Holiday Creator Features` for format versions 1.19.40 and higher._

Type: String/Object

-   `identifier`: String
    -   The identifier of the geometry.
-   `bone_visibility`: Object
    -   Optional “array” of Booleans that define the visibility of individual bones in the geometry file. In order to set up bone_visibility the geometry file name must be entered as an identifier. After the identifier has been specified, bone_visibility can be defined based on the names of the bones in the specified geometry file on a true/false basis.
    -   Note that all bones default to true, so bones should only be defined if they are being set to false. Including bones set to true will work the same as the default.

#### Example using String

<CodeHeader>minecraft:block > components</CodeHeader>

```json
"minecraft:geometry": "geometry.example_block"
```

#### Example using Object

<CodeHeader>minecraft:block > components</CodeHeader>

```json
"minecraft:geometry": {
    "identifier": "geometry.example_block"
}
```

---

#### Bone Visibility

Hide direct child cubes of bones in your model.

**Molang expressions must adhere to [permutation condition](/blocks/block-permutations#permutation-conditions) limitations.**

_Molang expressions supported in `bone_visibility` for format versions 1.20.10 and higher._

<CodeHeader>minecraft:block > components</CodeHeader>

```json
"minecraft:geometry": {
    "identifier": "geometry.example_block",
    "bone_visibility": {
        "wiki_bone": false,
        "conditional_bone": "q.block_state('wiki:example_state') == 3",
        "another_bone": true
    }
}
```

### Item Visual

Determines how this block is displayed as an item.

Type: Object

-   `geometry`: String/Object - the displayed [geometry](#geometry) component.
-   `material_instances`: Object - the displayed [material instances](#material-instances) component.

_Released from experiment `Upcoming Creator Features` for format versions 1.21.60 and higher._

<CodeHeader>minecraft:block > components</CodeHeader>

```json
"minecraft:item_visual": {
    "geometry": "minecraft:geometry.full_block",
    "material_instances": {
        "*": {
            "texture": "wiki:block_texture"
        }
    }
}
```

### Light Dampening

The amount that light will be dampened when it passes through the block, in a range (0-15). Higher value means the light will be dampened more.

Type: Int

<CodeHeader>minecraft:block > components</CodeHeader>

```json
"minecraft:light_dampening": 7
```

### Light Emission

The amount of light this block will emit in a range (0-15). Higher value means more light will be emitted.

Type: Int

<CodeHeader>minecraft:block > components</CodeHeader>

```json
"minecraft:light_emission": 10
```

### Liquid Detection

Determines how this blocks behaves with different types of liquid.

Type: Object

-   `detection_rules`: Array
    -   `liquid_type`: String - which type of liquid this rule applies to. Currently only `water` is supported.
    -   `can_contain_liquid`: Boolean - whether the liquid type can occupy the same space as this block e.g., waterlogging.
    -   `on_liquid_touches`: String - determines what happens when the liquid type flows into the block.
    -   `stops_liquid_flowing_from_direction`: Array - determines an array of directions that the liquid cannot flow out of this block from.

_Released from experiment `Upcoming Creator Features` for format versions 1.21.60 and higher._

<CodeHeader>minecraft:block > components</CodeHeader>

```json
"minecraft:liquid_detection": {
    "detection_rules": [
        {
            "liquid_type": "water",
            "can_contain_liquid": true, // Waterloggable
            "on_liquid_touches": "no_reaction", // Water flows through the block like air
        }
    ]
}
```

### Loot

The path to the loot table, relative to the behavior pack. Silk Touch overrides this.

**If omitted, drops the block as an item.**

Type: String

<CodeHeader>minecraft:block > components</CodeHeader>

```json
"minecraft:loot": "loot_tables/blocks/custom_block.json"
```

### Map Color

Sets the color of the block when rendered to a map. The color is represented as a hex value in the format `#RRGGBB`. May also be expressed as an array of [R, G, B] from 0 to 255. If this component is omitted, the block will not show up on the map.

Type: String/Vector [a, b, c]

#### Example using String

<CodeHeader>minecraft:block > components</CodeHeader>

```json
"minecraft:map_color": "#FFFFFF"
```

#### Example using Vector [a, b, c]

<CodeHeader>minecraft:block > components</CodeHeader>

```json
"minecraft:map_color": [255, 255, 255]
```

### Material Instances

Configuration of your block's rendering, including textures and lighting.

-   All instances must have the same render method.
-   Block faces will unconditionally darken if intersecting another block.
-   The texture on the `down` face is used for destruction particles.

Material instances can be combined with `RP/blocks.json` entries to create blocks which exhibit opaque-like properties. This is primarily used to enable face culling on [custom glass blocks](/blocks/custom-glass-blocks).

_Released from experiment `Holiday Creator Features` for format versions 1.19.40 and higher._

#### Render Methods

Render methods essentially control how a block appears in the world, much like entity materials. Below are the key properties of each type:

| Render Method           | _Transparency_ | _Translucency_ | _Backface Culling_ | _Distant Culling_ | Vanilla Examples                |
| ----------------------- | :------------: | :------------: | :----------------: | :---------------: | ------------------------------- |
| alpha_test              |       ✔️       |       ❌       |         ❌         |        ✔️         | Vines, Rails, Saplings.         |
| alpha_test_single_sided |       ✔️       |       ❌       |         ✔️         |        ✔️         | Doors, Trapdoors.               |
| blend                   |       ✔️       |       ✔️       |         ✔️         |        ❌         | Glass, Beacon, Honey Block.     |
| double_sided            |       ❌       |       ❌       |         ❌         |        ❌         | N/A - Use for opaque 2D plains. |
| opaque _(default)_      |       ❌       |       ❌       |         ✔️         |        ❌         | Dirt, Stone, Concrete.          |

-   **_Transparency_** - fully see-through areas.

-   **_Translucency_** - semi-transparent areas.

-   **_Backface Culling_** - faces become invisible when viewed from behind.

-   **_Distant Culling_** - the block becomes invisible before reaching the full render distance.

<CodeHeader>minecraft:block > components</CodeHeader>

```json
"minecraft:material_instances": {
  // '*' instance required - default instance for cube faces
  // Instance names 'up', 'down', 'north', 'east', 'south' and 'west' are built in
  "*": {
    "texture": "wiki:texture_name", // Shortname defined in `RP/textures/terrain_texture.json`
    "render_method": "blend", // One of the render methods in the above table
    "face_dimming": true, // Defaults to true; should faces with this material be dimmed by their direction?
    "ambient_occlusion": true // Defaults to true (1); should shadows be created based on surrounding blocks? Floats determine ambient occlusion intensity.
  }
}
```

#### Custom Instance Names

:::tip
Custom material instance names can be defined on the faces of cubes within Blockbench by right-clicking on a cube and opening its `Material Instances`.
:::

Custom instance names can be defined within material instances, and can be referenced by built-in instance names, or within the block model.

<CodeHeader>minecraft:block > components</CodeHeader>

```json
"minecraft:material_instances": {
  "*": {
    "texture": "wiki:texture_name",
    "render_method": "blend" // Must match other instances
  },
  // Custom instance name
  "end": {
    "texture": "wiki:texture_name_end",
    "render_method": "blend" // Must match other instances
  },
  "up": "end",
  "down": "end",
  // Instance name defined in model:
  "flower": {
    "texture": "wiki:texture_name_flower",
    "render_method": "blend" // Must match other instances
  }
}
```

### Placement Filter

Sets rules for under what conditions the block can be placed or survive.

_Released from experiment `Holiday Creator Features` for format versions 1.19.60 and higher._

Type: Object

-   `conditions`: Array - List of conditions where the block can be placed/survive. Limited to 64 conditions. Each condition is a JSON Object that must contain at least one (and can contain both) of the parameters `allowed_faces` or `block_filter` as shown below.
    -   `allowed_faces`: Array - List of any of the following strings describing which face(s) this block can be placed on: `up`, `down`, `north`, `south`, `east`, `west`, `side`, `all`. Limited to 6 faces.
    -   `block_filter`: Array - List of blocks that this block can be placed against in the `allowed_faces` direction. Limited to 64 blocks. Each block in this list can either be specified as a String (block name) or as a [block descriptor](/documentation/shared-constructs#block-descriptors).

<CodeHeader>minecraft:block > components</CodeHeader>

```json
    "minecraft:placement_filter": {
        "conditions": [
            {
                "allowed_faces": [
                    "up"
                ],
                "block_filter": [
                    "minecraft:dirt",
                    {
                        "name": "minecraft:sand",
                        "states": {
                            "sand_type": "red"
                        }
                    },
                    {
                        "tags": "!q.any_tag('stone', 'wiki_tag')"
                    }
                ]
            }
        ]
    }
```

See [this](/blocks/block-tags) page for a list of vanilla tags and relevant blocks.

### Redstone Conductivity

Defines a block's ability to conduct redstone power.

_Released from experiment `Upcoming Creator Features` for format versions 1.21.40 and higher._

Type: Object

-   `redstone_conductor`: Boolean
    -   Determines whether this block conducts direct redstone power.
-   `allows_wire_to_step_down`: Boolean
    -   Determines whether redstone wire can travel down the side of this block.

<CodeHeader>minecraft:block > components</CodeHeader>

```json
"minecraft:redstone_conductivity": {
    "redstone_conductor": true,
    "allows_wire_to_step_down": false
}
```

### Selection Box

Defines the area of the block that is selected by the player's cursor. If set to true, default values are used. If set to false, this block is not selectable by the player's cursor. If this component is omitted, default values are used.

_Released from experiment `Holiday Creator Features` for format versions 1.19.60 and higher._

Type: Boolean/Object

-   `origin`: Vector [a, b, c]
    -   Minimal position of the bounds of the collision box. `origin` is specified as `[x, y, z]` and must be in the range `(-8, 0, -8)` to `(8, 16, 8)`, inclusive.
-   `size`: Vector [a, b, c]
    -   Size of each side of the collision box. Size is specified as `[x, y, z]`. `origin` + `size` must be in the range `(-8, 0, -8)` to `(8, 16, 8)`, inclusive.

#### Example using Boolean

<CodeHeader>minecraft:block > components</CodeHeader>

```json
"minecraft:selection_box": true
```

#### Example using Object

<CodeHeader>minecraft:block > components</CodeHeader>

```json
"minecraft:selection_box": {
    "origin": [-8, 0, -8],
    "size": [16, 16, 16]
}
```

### Tick

Causes the block to tick after a random delay in the range specified by `interval_range`.

Type: Object

-   `interval_range`: Range [a, b]
    -   Two durations (in ticks) which will be used as the minimum and maximum delays for randomness.
-   `looping`: Boolean
    -   Whether this block should continuously tick, rather than only ticking once.

_Released from experiment `Beta APIs` for format versions 1.21.10 and higher._

<CodeHeader>minecraft:block > components</CodeHeader>

```json
"minecraft:tick": {
    "interval_range": [10, 20],
    "looping": true
}
```

### Transformation

Supports rotation, scaling, and translation. The component can be added to the whole block and/or to individual block permutations. Transformed geometries still have the same restrictions that non-transformed geometries have such as a maximum size of 30/16 units.

**Transformed models must not exceed the [block geometry limits](#geometry).**

:::tip
Lean about [rotatable blocks](/blocks/rotatable-blocks) to apply rotation based on how the block is placed, just like furnaces and mob heads!
:::

Type: Object

-   `rotation`: Vector [a, b, c]
    -   How many degrees to rotate the geometry. [x ,y, z]. Must be in increments of 90. Can be negative. If not in increment of 90, the game will round to the nearest 90 increment.
-   `rotation_pivot`: Vector [a, b, c]
    -   The pivot point(in block units) to rotate the block on.
-   `scale`: Vector [a, b, c]
    -   How many pixels to scale the geometry. [x ,y, z]
-   `scale_pivot`: Vector [a, b, c]
    -   The pivot point(in block units) to scale the block on.
-   `translation`: Vector [a, b, c]
    -   How many pixels to translate the geometry. [x ,y, z]

<CodeHeader>minecraft:block > components</CodeHeader>

```json
"minecraft:transformation": {
    "translation": [-5, 8, 0 ],
    "rotation": [90, 180, 0],
    "scale": [0.5, 1, 0.5],
    "rotation_pivot": [0, 0, 0],
    "scale_pivot": [0, 0, 0]
}
```
