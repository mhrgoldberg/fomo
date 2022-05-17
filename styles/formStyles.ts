import styled from "styled-components"

export const AuthFormContainer = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  background: var(--secondary-background);
  width: 45rem;
  border-radius: var(--card-border-radius);
  padding: 3rem 5rem;
  div.providers {
    width: 100%;
    display: flex;
    flex-direction: column;
    gap: 1rem;
    margin-bottom: 1rem;
    padding: 2rem 0;
    border-bottom: 0.2rem dashed var(--secondary-dark);
  }

  div.providers:first-child {
    padding-top: 0;
  }
  form {
    width: 100%;
  }
  label {
    display: flex;
    justify-content: flex-start;
    align-items: flex-start;
  }
  button {
    width: 100%;
    margin: 0;
    padding: 1rem 2rem;
  }
`

export const FormContainer = styled.div`
  /* layout (Container Grid)*/
  display: grid;
  grid-gap: 1rem;
  grid-template-rows: 10rem minmax(20rem, 1fr) 10rem;
  justify-items: center;
  width: 100%;
  max-width: 120rem;
  min-height: 50rem;
  margin: auto;
  grid-area: main;

  .header {
    /* container grid placement */
    grid-column: 1;
    grid-row: 1;
    /* layout */
    display: flex;
    justify-content: center;
    align-items: center;
    height: 100%;
    width: 100%;
  }

  form {
    /* layout (Form Grid)*/
    grid-column: 1;
    grid-row: 2;
  }
`

export const FormInputContainer = styled.div`
  /* layout */
  height: fit-content;
  width: 100%;
  display: grid;
  grid-template-rows: auto;

  .formFieldError {
    border-bottom: 0.2rem solid var(--error) !important;
    ::placeholder {
      color: var(--error);
      font-size: 1.2rem;
    }
  }

  label {
    width: 100%;
    font-size: 2.2rem;
    color: var(--primary-light);
  }
`
