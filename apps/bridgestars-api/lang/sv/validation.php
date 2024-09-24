<?php

return [

    /*
    |--------------------------------------------------------------------------
    | Validation Language Lines
    |--------------------------------------------------------------------------
    |
    | The following language lines contain the default error messages used by
    | the validator class. Some of these rules have multiple versions such
    | as the size rules. Feel free to tweak each of these messages here.
    |
    */

    'accepted' => 'Du måste acceptera :attribute.',
    'accepted_if' => 'Du måste acceptera :attribute när :other är :value.',
    'active_url' => ':Attribute är inte en giltig webbadress.',
    'after' => ':Attribute måste vara ett datum efter :date.',
    'after_or_equal' => ':Attribute måste vara ett datum efter eller samma som :date.',
    'alpha' => ':Attribute får endast innehålla bokstäver.',
    'alpha_dash' => ':Attribute får endast innehålla bokstäver, siffror, bindestreck och understreck.',
    'alpha_num' => ':Attribute får endast innehålla bokstäver och siffror.',
    'array' => ':Attribute måste vara en lista.',
    'ascii' => ':Attribute får endast innehålla ASCII-tecken.',
    'before' => ':Attribute måste vara ett datum före :date.',
    'before_or_equal' => ':Attribute måste vara ett datum före eller samma som :date.',
    'between' => [
        'array' => ':Attribute måste innehålla mellan :min och :max objekt.',
        'file' => ':Attribute måste vara mellan :min och :max kilobyte.',
        'numeric' => ':Attribute måste vara mellan :min och :max.',
        'string' => ':Attribute måste vara mellan :min och :max tecken.',
    ],
    'boolean' => ':Attribute måste vara sant eller falskt.',
    'can' => 'Du har inte behörighet att välja :attribute.',
    'confirmed' => ':Attribute bekräftelsen matchar inte.',
    'current_password' => 'Lösenordet är felaktigt.',
    'date' => ':Attribute är inte ett giltigt datum.',
    'date_equals' => ':Attribute måste vara ett datum som är samma som :date.',
    'date_format' => ':Attribute matchar inte formatet :format.',
    'decimal' => ':Attribute måste vara ett nummer med :decimals decimaler.',
    'declined' => 'Du måste avböja :attribute.',
    'declined_if' => 'Du måste avböja :attribute när :other är :value.',
    'different' => ':Attribute och :other får inte vara samma.',
    'digits' => ':Attribute måste vara :digits siffror.',
    'digits_between' => ':Attribute måste vara mellan :min och :max siffror.',
    'dimensions' => ':Attribute har felaktig bildstorlek.',
    'distinct' => ':Attribute har ett värde som redan finns.',
    'doesnt_end_with' => ':Attribute får inte sluta med något av följande: :values.',
    'doesnt_start_with' => ':Attribute får inte börja med något av följande: :values.',
    'email' => ':Attribute måste vara en giltig email.',
    'ends_with' => ':Attribute måste sluta med något av följande: :values.',
    'enum' => ':Attribute måste vara något av följande: :values.',
    'exists' => 'Det valda :attribute är ogiltigt.',
    'file' => ':Attribute måste vara en fil.',
    'filled' => ':Attribute måste ha vara ifylld.',
    'gt' => [
        'array' => ':Attribute måste ha fler än :value objekt.',
        'file' => ':Attribute måste vara större än :value kilobyte.',
        'numeric' => ':Attribute måste vara större än :value.',
        'string' => ':Attribute måste ha mer än :value tecken.',
    ],
    'gte' => [
        'array' => ':Attribute måste ha minst :value objekt.',
        'file' => ':Attribute måste vara minst :value kilobyte.',
        'numeric' => ':Attribute måste vara minst :value.',
        'string' => ':Attribute måste ha minst :value tecken.',
    ],
    'image' => ':Attribute måste vara en bild.',
    'in' => 'Det valda :attribute är ogiltigt.',
    'in_array' => ':Attribute måste finnas inte i :other.',
    'integer' => ':Attribute måste vara ett heltal.',
    'ip' => ':Attribute måste vara en giltig IP-adress.',
    'ipv4' => ':Attribute måste vara en giltig IPv4-adress.',
    'ipv6' => ':Attribute måste vara en giltig IPv6-adress.',
    'json' => ':Attribute måste vara en giltig JSON-sträng.',
    'lowercase' => ':Attribute måste vara enbart små bokstäver.',
    'lt' => [
        'array' => ':Attribute måste ha färre än :value objekt.',
        'file' => ':Attribute måste vara mindre än :value kilobyte.',
        'numeric' => ':Attribute måste vara mindre än :value.',
        'string' => ':Attribute måste ha färre än :value tecken.',
    ],
    'lte' => [
        'array' => ':Attribute får inte ha fler än :value objekt.',
        'file' => ':Attribute får inte vara större än :value kilobyte.',
        'numeric' => ':Attribute får inte vara större än :value.',
        'string' => ':Attribute får inte ha mer än :value tecken.',
    ],
    'mac_address' => ':Attribute måste vara en giltig MAC-adress.',
    'max' => [
        'array' => ':Attribute får inte ha fler än :max objekt.',
        'file' => ':Attribute får inte vara större än :max kilobyte.',
        'numeric' => ':Attribute får inte vara större än :max.',
        'string' => ':Attribute får inte ha mer än :max tecken.',
    ],
    'max_digits' => ':Attribute får inte ha mer än :max siffror.',
    'mimes' => ':Attribute måste vara en fil av typen: :values.',
    'mimetypes' => ':Attribute måste vara en fil av typen: :values.',
    'min' => [
        'array' => ':Attribute måste ha minst :min objekt.',
        'file' => ':Attribute måste vara minst :min kilobyte.',
        'numeric' => ':Attribute måste vara minst :min.',
        'string' => ':Attribute måste ha minst :min tecken.',
    ],
    'min_digits' => ':Attribute måste ha minst :min siffror.',
    'missing' => ':Attribute får inte vara ifylld.',
    'missing_if' => ':Attribute får inte vara ifylld när :other är :value.',
    'missing_unless' => ':Attribute får inte vara ifylld när :other inte är :values.',
    'missing_with' => ':Attribute får inte vara ifylld när :values är ifyllt.',
    'missing_with_all' => ':Attribute får inte vara ifylld när :values är ifyllt.',
    'multiple_of' => ':Attribute måste vara ett multiplum av :value.',
    'not_in' => 'Det valda :attribute är ogiltigt.',
    'not_regex' => ':Attribute har ett ogiltigt format.',
    'numeric' => ':Attribute måste vara ett nummer.',
    'password' => [
        'letters' => ':Attribute måste innehålla minst en bokstav.',
        'mixed' => ':Attribute måste innehålla både bokstäver och siffror.',
        'numbers' => ':Attribute måste innehålla minst en siffra.',
        'symbols' => ':Attribute måste innehålla minst ett specialtecken.',
        'uncompromised' => ':Attribute har upptäckts i en databas med läckta lösenord. Välj ett annat lösenord.',
    ],
    'present' => ':Attribute måste vara ifyllt.',
    'prohibited' => ':Attribute är inte tillåtet.',
    'prohibited_if' => ':Attribute är inte tillåtet när :other är :value.',
    'prohibited_unless' => ':Attribute är inte tillåtet när :other inte är :values.',
    'prohibits' => ':Attribute förbjuder :other från att vara ifyllt.',
    'regex' => ':Attribute har ett ogiltigt format.',
    'required' => ':Attribute måste vara ifyllt.',
    'required_array_keys' => ':Attribute måste ha följande nycklar: :keys.',
    'required_if' => ':Attribute måste vara ifyllt när :other är :value.',
    'required_if_accepted' => ':Attribute måste vara ifyllt när :other är accepterat.',
    'required_unless' => ':Attribute måste vara ifyllt när :other inte är :values.',
    'required_with' => ':Attribute måste vara ifyllt när :values är ifyllt.',
    'required_with_all' => ':Attribute måste vara ifyllt när :values är ifyllt.',
    'required_without' => ':Attribute måste vara ifyllt när :values inte är ifyllt.',
    'required_without_all' => ':Attribute måste vara ifyllt när ingen av :values är ifyllt.',
    'same' => ':Attribute och :other måste vara lika.',
    'size' => [
        'array' => ':Attribute måste innehålla :size objekt.',
        'file' => ':Attribute måste vara :size kilobyte.',
        'numeric' => ':Attribute måste vara :size.',
        'string' => ':Attribute måste vara :size tecken.',
    ],
    'starts_with' => ':Attribute måste börja med något av följande: :values.',
    'string' => ':Attribute måste vara en sträng.',
    'timezone' => ':Attribute måste vara en giltig tidszon.',
    'unique' => ':Attribute är redan upptaget.',
    'uploaded' => ':Attribute kunde inte laddas upp.',
    'uppercase' => ':Attribute måste vara enbart stora bokstäver.',
    'url' => ':Attribute har ett ogiltigt format.',
    'ulid' => ':Attribute måste vara en giltig ULID.',
    'uuid' => ':Attribute måste vara en giltig UUID.',

    /*
    |--------------------------------------------------------------------------
    | Custom Validation Language Lines
    |--------------------------------------------------------------------------
    |
    | Here you may specify custom validation messages for attributes using the
    | convention "attribute.rule" to name the lines. This makes it quick to
    | specify a specific custom language line for a given attribute rule.
    |
    */

    'custom' => [
        'attribute-name' => [
            'rule-name' => 'custom-message',
        ],
    ],

    /*
    |--------------------------------------------------------------------------
    | Custom Validation Attributes
    |--------------------------------------------------------------------------
    |
    | The following language lines are used to swap our attribute placeholder
    | with something more reader friendly such as "E-Mail Address" instead
    | of "email". This simply helps us make our message more expressive.
    |
    */

    'attributes' => [
        'email' => 'email',
        'password' => 'lösenord',
        'name' => 'namn',
        'phone' => 'telefonnummer',
        'password_confirmation' => 'bekräfta lösenord',
        'chapter_id' => 'kapitel id:t',
        'bid' => 'bud',
    ],

];
