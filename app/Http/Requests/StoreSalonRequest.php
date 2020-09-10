<?php

namespace App\Http\Requests;

use Illuminate\Foundation\Http\FormRequest;
use Illuminate\Validation\Rule;

class StoreSalonRequest extends FormRequest
{
    /**
     * Determine if the user is authorized to make this request.
     *
     * @return bool
     */
    public function authorize()
    {
        return true;
    }

    /**
     * Get the error messages for the defined validation rules.
     *
     * @return array
     */
    public function messages()
    {
        return [
            'salon.name.required' => 'Salon name is required',
            'user.name.required' => 'Director name is required',
            'salon.phone_number.required' => 'Phone number is required',
            'user.email.required' => 'Email number is required',
            'salon.phone_number.numeric' => 'Phone number may only contain numbers.',
            'salon.phone_number.digits' => 'Phone number must be 8 digits.',
            'user.email.email' => 'Email must be a valid email address.',
            'user.email.unique' => 'Email has already been taken.',
            'salon.phone_number.unique' => 'Phone number has already been taken.',
        ];
    }

    /**
     * Get the validation rules that apply to the request.
     *
     * @return array
     */
    public function rules()
    {
        $rules = [
            'salon.name' => ['required', 'max:255'],
            'user.name' => ['required', 'max:255'],
            'salon.phone_number' => ['required', 'digits:8', Rule::unique('salons', 'phone_number')->ignore($this['id'])],
            'user.email' => ['required', 'email', Rule::unique('users', 'email')->ignore($this['user']['id'])]
        ];

        return $rules;
    }
}
