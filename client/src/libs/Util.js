const formatValue = (value, format, sanitizeFlag) => {
    console.log('formatValue', value, format, sanitizeFlag)
    if (sanitizeFlag) {
        return sanitize(value, format)
    }

    if (format === 'cpf') {
        value = value.replace(/\D/g, '')
        value = value.replace(/(\d{3})(\d)/, '$1.$2')
        value = value.replace(/(\d{3})(\d)/, '$1.$2')
        value = value.replace(/(\d{3})(\d{1,2})/, '$1-$2')
        return fixInputLength(value, 14)
    }

    else if (format === 'cellphone') {
        value = value.replace(/\D/g, '')
        value = value.replace(/(\d{2})(\d)/, '($1) $2')
        value = value.replace(/(\d{5})(\d)/, '$1-$2')
        return fixInputLength(value, 15)
    }

    else if (format === 'number') {
        value = value.replace(/\D/g, '')
        return value
    }

    else if (format === 'cep') {
        return fixInputLength(value, 9)
    }

    else if (format === 'cnpj') {
        value = value.replace(/\D/g, '')
        value = value.replace(/(\d{2})(\d)/, '$1.$2')
        value = value.replace(/(\d{3})(\d)/, '$1.$2')
        value = value.replace(/(\d{3})(\d)/, '$1/$2')
        value = value.replace(/(\d{4})(\d)/, '$1-$2')
        return fixInputLength(value, 18)
    }

    else if (format === 'phone') {
        value = value.replace(/\D/g, '')
        value = value.replace(/(\d{2})(\d)/, '($1) $2')
        value = value.replace(/(\d{4})(\d)/, '$1-$2')
        return fixInputLength(value, 14)
    }
}

const sanitize = (value, format) => {
    if (format === 'cpf' || format === 'cnpj' || format === 'cellphone' || format === 'phone' || format === 'number' || format === 'cep') {
        value = value.replace(/\D/g, '')
        return value
    }
}

const fixInputLength = (inputValue, length) => {
    if (inputValue.length > length) {
        inputValue = inputValue.slice(0, length)
    }
    return inputValue
}

export { formatValue }