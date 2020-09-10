<?php

namespace App\Http\Requests;

use Illuminate\Foundation\Http\FormRequest;
use Illuminate\Validation\Rule;

class UpdatePasswordRequest extends FormRequest
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
            'password.required' => 'Password is required.',
            'password.min' => 'Length should be 6 to 12.',
            'password.max' => 'Length should be 6 to 12.',
            'password.confirmed' => 'Password confirmation does not match.'
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
            'password' => ['required', 'min:6', 'max:12', 'confirmed'],
        ];

        return $rules;
    }
}
