using System.Collections;
using System.Collections.Generic;
using UnityEngine;

public class PlayerMovement : MonoBehaviour
{
    private float horizontalMovement;
    private float verticalMovement;
    public float speed = 5.0f;
    public Vector2 turn     ;
    public Vector3 deltaMove;
    public float drag;

    private Rigidbody rb;

    void Start()
    {
        Cursor.lockState = CursorLockMode.Locked;
        rb = GetComponent<Rigidbody>();
        rb.freezeRotation = true;
    }

    void Update()
    {
        turn.x += Input.GetAxis("Mouse X");
        transform.localRotation = Quaternion.Euler(0, turn.x, 0);

        horizontalMovement = Input.GetAxisRaw("Horizontal");
        verticalMovement = Input.GetAxisRaw("Vertical");
        Vector3 movementDirection = transform.forward * verticalMovement +
                                    transform.right * horizontalMovement;

        rb.AddForce(movementDirection * speed, ForceMode.Force);
        rb.drag = drag;
    }
}