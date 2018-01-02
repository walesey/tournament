import React, { Component } from 'react';
import { getFieldValues } from 'app/lib/forms';
import formStyles from 'app/assets/styles/forms.css';
import buttonStyles from 'app/assets/styles/buttons.css';

import styles from './styles.css';

export default class TemplateForm extends Component {
  handleInputChange = (event) => {
    const { emitter, template } = this.props;
    const { value, name } = getFieldValues(event);

    const newTemplate = {
      ...template,
      [name]: value,
    }
    emitter.emit('templateFormChange', newTemplate);
  }

  handleFieldChange = (index) => (event) => {
    const { emitter, template } = this.props;
    const { value, name } = getFieldValues(event);

    emitter.emit('templateFormChange', {
      ...template,
      Fields: template.Fields.map((field, i) => i === index ? {...field, [name]: value} : field),
    });
  }

  handleSubmit = (event) => {
    event.preventDefault();
    const { emitter } = this.props;
    emitter.emit('templateFormSubmit');
  }

  onClickAddField = (event) => {
    event.preventDefault();
    const { emitter, template } = this.props;
    const fieldName = `field-${Object.keys(template.Fields).length}`;
    
    const newTemplate = {
      ...template,
      Fields: [
        ...template.Fields,
        {
          FieldName: fieldName,
          FieldType: 'string',
          DefaultValue: '',
          Options: '',
          SearchPath: '',
          Reference: false,
          List: false,
        },
      ],
    };
    emitter.emit('templateFormChange', newTemplate);
  }

  onClickRemoveField = (index) => (event) => {
    event.preventDefault();
    const { emitter, template } = this.props;

    const newTemplate = {
      ...template,
      Fields: template.Fields.reduce((acc, field, i) => {
        if (index !== i) {
          acc.push(field)
        }
        return acc;
      }, []),
    };
    emitter.emit('templateFormChange', newTemplate);
  }

  render() {
    const { template, images } = this.props;

    const selectedImage = images && template && images[template.Icon]

    return (
      <div className={styles.root}>
        {template && <form className={formStyles.form} onSubmit={this.handleSubmit}>
          <label>
            Name<br/>
            <input name="Name" type="text" value={template.Name} onChange={this.handleInputChange} />
            <br/>
          </label>
          <label>
            Icon<br/>
            <select name="Icon" value={template.Icon} onChange={this.handleInputChange}>
              <option value=''></option>
              {images && Object.keys(images).map(
                (key) => <option key={key} value={key}>{key}</option>
              )}
            </select>
            <img className={styles.image} src={selectedImage} />
            <br/>
          </label>
          <br/>
          <button className={buttonStyles.button} onClick={this.onClickAddField}>Add Field</button>
          <br/> 
          <input className={buttonStyles.button} type="submit" value="Submit" />
        </form>}
      </div>
    );
  }
}