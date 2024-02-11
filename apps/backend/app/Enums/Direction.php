<?php
declare(strict_types=1);

namespace App\Enums;

use Spatie\Enum\Enum;
use Spatie\TypeScriptTransformer\Attributes\TypeScript;

/**
 * @method static self north()
 * @method static self east()
 * @method static self west()
 * @method static self south() */
#[typescript]
class Direction extends Enum
{
    protected static function values(): array
    {
        return [
            'north' => 'N',
            'east' => 'E',
            'south' => 'S',
            'west' => 'W',
        ];
    }

    public function order(): int
    {
        return match ($this->value) {
            'N' => 0,
            'E' => 1,
            'S' => 2,
            'W' => 3,
        };
    }

    public function opposite(): self
    {
        return match ($this->value) {
            'N' => self::south(),
            'E' => self::west(),
            'S' => self::north(),
            'W' => self::east(),
        };
    }

    public function next(): self
    {
        return match ($this->value) {
            'N' => self::east(),
            'E' => self::south(),
            'S' => self::west(),
            'W' => self::north(),
        };
    }
}
